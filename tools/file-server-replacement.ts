import { writeFileSync } from 'fs';
import { workspaceRoot } from 'nx/src/utils/app-root';
import { join } from 'path';

const fileServerReplacement = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const devkit_1 = require("@nrwl/devkit");
const ignore_1 = require("ignore");
const fs_1 = require("fs");
const chokidar_1 = require("chokidar");
const os_1 = require("os");
const path_1 = require("path");
// platform specific command name
const pmCmd = (0, os_1.platform)() === 'win32' ? \`npx.cmd\` : 'npx';
function getHttpServerArgs(options) {
    const args = ['-c-1'];
    if (options.port) {
        args.push(\`-p=\${options.port}\`);
    }
    if (options.host) {
        args.push(\`-a=\${options.host}\`);
    }
    if (options.ssl) {
        args.push(\`-S\`);
    }
    if (options.sslCert) {
        args.push(\`-C=\${options.sslCert}\`);
    }
    if (options.sslKey) {
        args.push(\`-K=\${options.sslKey}\`);
    }
    if (options.proxyUrl) {
        args.push(\`-P=\${options.proxyUrl}\`);
    }
    if (options.proxyOptions) {
        Object.keys(options.proxyOptions).forEach((key) => {
            args.push(\`--proxy-options.\${key}=options.proxyOptions[key]\`);
        });
    }
    args.push('--cors');
    return args;
}
function getBuildTargetCommand(options) {
    const cmd = ['nx', 'run', options.buildTarget];
    if (options.withDeps) {
        cmd.push(\`--with-deps\`);
    }
    if (options.parallel) {
        cmd.push(\`--parallel\`);
    }
    if (options.maxParallel) {
        cmd.push(\`--maxParallel=\${options.maxParallel}\`);
    }
    return cmd;
}
function getBuildTargetOutputPath(options, context) {
    let buildOptions;
    try {
        const [project, target, config] = options.buildTarget.split(':');
        const buildTarget = context.workspace.projects[project].targets[target];
        buildOptions = config
            ? Object.assign(Object.assign({}, buildTarget.options), buildTarget.configurations[config]) : buildTarget.options;
    }
    catch (e) {
        throw new Error(\`Invalid buildTarget: \${options.buildTarget}\`);
    }
    // TODO: vsavkin we should also check outputs
    const outputPath = buildOptions.outputPath;
    if (!outputPath) {
        throw new Error(\`Invalid buildTarget: \${options.buildTarget}. The target must contain outputPath property.\`);
    }
    return outputPath;
}
function getIgnoredGlobs(root) {
    const ig = (0, ignore_1.default)();
    try {
        ig.add((0, fs_1.readFileSync)(\`\${root}/.gitignore\`, 'utf-8'));
    }
    catch (_a) { }
    try {
        ig.add((0, fs_1.readFileSync)(\`\${root}/.nxignore\`, 'utf-8'));
    }
    catch (_b) { }
    return ig;
}
function createFileWatcher(root, changeHandler) {
    const ignoredGlobs = getIgnoredGlobs(root);
    const layout = (0, devkit_1.workspaceLayout)();
    const watcher = (0, chokidar_1.watch)([
        (0, devkit_1.joinPathFragments)(layout.appsDir, '**'),
        (0, devkit_1.joinPathFragments)(layout.libsDir, '**'),
    ], {
        cwd: root,
        ignoreInitial: true,
    });
    watcher.on('all', (_event, path) => {
        if (ignoredGlobs.ignores(path))
            return;
        changeHandler();
    });
    return () => watcher.close();
}
function fileServerExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* fileServerExecutor_1() {
        let running = false;
        const run = () => {
            if (!running) {
                running = true;
                try {
                    const args = getBuildTargetCommand(options);
                    (0, child_process_1.execFileSync)(pmCmd, args, {
                        stdio: [0, 1, 2],
                    });
                }
                catch (_a) { }
                running = false;
            }
        };
        let disposeWatch;
        if (options.watch) {
            disposeWatch = createFileWatcher(context.root, run);
        }
        // perform initial run
        run();
        const outputPath = getBuildTargetOutputPath(options, context);
        const args = getHttpServerArgs(options);
        const pathToHttpServerPkgJson = require.resolve('http-server/package.json');
        const pathToHttpServerBin = (0, devkit_1.readJsonFile)(pathToHttpServerPkgJson).bin['http-server'];
        const pathToHttpServer = (0, path_1.resolve)(pathToHttpServerPkgJson.replace('package.json', ''), pathToHttpServerBin);
        const serve = (0, child_process_1.fork)(pathToHttpServer, [outputPath, ...args], {
            cwd: context.root,
            env: Object.assign({ FORCE_COLOR: 'true' }, process.env),
        });
        const processExitListener = () => {
            serve.kill();
            if (disposeWatch) {
                disposeWatch();
            }
        };
        process.on('exit', processExitListener);
        process.on('SIGTERM', processExitListener);
        serve.stdout.on('data', (chunk) => {
            if (chunk.toString().indexOf('GET') === -1) {
                process.stdout.write(chunk);
            }
        });
        serve.stderr.on('data', (chunk) => {
            process.stderr.write(chunk);
        });
        yield yield tslib_1.__await({
            success: true,
            baseUrl: \`\${options.ssl ? 'https' : 'http'}://\${options.host}:\${options.port}\`,
        });
        return yield tslib_1.__await(new Promise((res) => {
            serve.on('exit', (code) => {
                if (code == 0) {
                    res({ success: true });
                }
                else {
                    res({ success: false });
                }
            });
        }));
    });
}
exports.default = fileServerExecutor;`;

writeFileSync(
  join(
    workspaceRoot,
    '/node_modules/',
    '@nrwl/angular/src/executors/file-server/file-server.impl.js'
  ),
  fileServerReplacement
);
