import { dirname, resolve } from 'node:path';
import type { Module } from './module';
import type { Statement } from './statement';
import { ModuleLoader } from './moduleLoader';
import type { Bundle } from './bundle';
import { keys } from './utils/object';

interface GraphOptions {
  entry: string;
  bundle: Bundle;
}

/**
 * @description: 模块依赖图对象的实现
 * @return {*}
 */
export class Graph {
  entryPath: string;
  basedir: string;
  statements: Statement[] = [];
  moduleLoader: ModuleLoader;
  modules: Module[] = [];
  moduleById: Record<string, Module> = {};
  resolveIds: Record<string, string> = {};
  orderedModules: Module[] = [];
  bundle: Bundle;
  constructor(options: GraphOptions) {
    const { entry, bundle } = options;
    this.entryPath = resolve(entry);
    this.basedir = dirname(this.entryPath);
    this.bundle = bundle;
    // 初始化模块加载器对象
    this.moduleLoader = new ModuleLoader(bundle);
  }

  async build(): Promise<void> {
    // 1. 获取并解析模块信息，返回入口模块对象
    const entryModule = await this.moduleLoader.fetchModule(this.entryPath, '', true);
    // 2. 构建依赖关系图
    this.modules.forEach((module) => module.bind());
    // 3. 模块拓扑排序
    this.orderedModules = this.sortModules(entryModule!);
    // 4. Tree Shaking，标记需要包含的语句
    entryModule!.getExports().forEach((name) => {
      const declaration = entryModule!.traceExport(name);
      declaration!.use();
    });
    // 5. 处理命名冲突
    this.handleNameConflict();
  }

  handleNameConflict(): void {
    const used: Record<string, true> = {};

    function getSafeName(name: string) {
      let safeName = name;
      let count = 1;
      while (used[safeName]) {
        safeName = `${name}$${count++}`;
      }
      used[safeName] = true;
      return safeName;
    }

    this.modules.forEach((module) => {
      keys(module.declarations).forEach((name) => {
        const declaration = module.declarations[name];
        declaration.name = getSafeName(declaration.name!);
      });
    });
  }

  getModuleById(id: string): Module {
    return this.moduleById[id];
  }

  addModule(module: Module): void {
    if (!this.moduleById[module.id]) {
      this.moduleById[module.id] = module;
      this.modules.push(module);
    }
  }

  sortModules(entryModule: Module): Module[] {
    const orderedModules: Module[] = [];
    const analysedModule: Record<string, boolean> = {};
    const parent: Record<string, string> = {};
    const cyclePathList: string[][] = [];
    // 回溯，用来定位循环依赖
    function getCyclePath(id: string, parentId: string): string[] {
      const paths = [id];
      let currentId = parentId;
      while (currentId !== id) {
        paths.push(currentId);
        // 向前回溯
        currentId = parent[currentId];
      }
      paths.push(paths[0]);
      return paths.reverse();
    }
    // 拓扑排序核心逻辑，基于依赖图的后序遍历完成
    function analyzeModule(module: Module) {
      if (analysedModule[module.id]) {
        return;
      }
      for (const dependency of module.dependencyModules) {
        // 检测到循环依赖
        // 如果某个模块没有被记录到 analysedModule 中，
        // 则表示它的依赖模块并没有分析完，在这个前提下中
        // 如果再次遍历到这个模块，说明已经出现了循环依赖，
        // 1. 不为入口模块
        if (parent[dependency.id]) {
          // 2. 依赖模块还没有分析结束
          if (!analysedModule[dependency.id]) {
            cyclePathList.push(getCyclePath(dependency.id, module.id));
          }
          continue;
        }
        parent[dependency.id] = module.id;
        analyzeModule(dependency);
      }
      // 由于 analyzeModule 函数中采用后序的方式来遍历依赖
      // 也就是说一旦某个模块被记录到 analysedModule 表中
      // 那么也就意味着其所有的依赖模块已经被遍历完成了:
      analysedModule[module.id] = true;
      orderedModules.push(module);
    }
    // 从入口模块开始分析
    analyzeModule(entryModule);
    // 如果有循环依赖，则打印循环依赖信息
    if (cyclePathList.length) {
      cyclePathList.forEach((paths) => {
        console.log(paths);
      });
      process.exit(1);
    }
    return orderedModules;
  }
}
