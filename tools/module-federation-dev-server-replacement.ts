import { writeFileSync } from 'fs';
import { workspaceRoot } from 'nx/src/utils/app-root';
import { join } from 'path';

const mfDevServerReplacement = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleFederationDevServer = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const ngcli_adapter_1 = require("nx/src/adapter/ngcli-adapter");
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require('rxjs');
const path_1 = require("path");
const child_process_1 = require('child_process');
const webpack_server_impl_1 = require("../webpack-server/webpack-server.impl");

function killPort(port, method = 'tcp') {
  port = Number.parseInt(port)

  if (!port) {
    return Promise.reject(new Error('Invalid argument provided for port'))
  }

  if (process.platform === 'win32') {
    return sh('netstat -nao')
      .then(res => {
        const { stdout } = res
        if (!stdout) return res

        const lines = stdout.split('\\n')
        // The second white-space delimited column of netstat output is the local port,
        // which is the only port we care about.
        // The regex here will match only the local port column of the output
        const lineWithLocalPortRegEx = new RegExp(\`^ *\${method.toUpperCase()} *[^ ]*:\${port}\`, 'gm')
        const linesWithLocalPort = lines.filter(line => line.match(lineWithLocalPortRegEx))

        const pids = linesWithLocalPort.reduce((acc, line) => {
          const match = line.match(/(\\d*)\\w*(\\n|$)/gm)
          return match && match[0] && !acc.includes(match[0]) ? acc.concat(match[0]) : acc
        }, [])

        return child_process_1.execSync(\`TaskKill /F /PID \${pids.join(' /PID ')}\`);
      })
  }

  return child_process_1.execSync(
    \`lsof -ni \${method === 'udp' ? 'udp' : 'tcp'}:\${port} | grep \${method === 'udp' ? 'UDP' : 'LISTEN'} | awk '{print $2}' | xargs kill -9\`
  );
}

function moduleFederationDevServer(schema, context) {
    const workspaces = new devkit_1.Workspaces(context.workspaceRoot);
    const workspaceConfig = workspaces.readWorkspaceConfiguration();
    const p = workspaceConfig.projects[context.target.project];
    const mfConfigPath = (0, path_1.join)(context.workspaceRoot, p.root, 'module-federation.config.js');
    let mfeConfig;
    try {
        mfeConfig = require(mfConfigPath);
    }
    catch (_a) {
        throw new Error(\`Could not load \${mfConfigPath}. Was this project generated with "@nrwl/angular:host"?\`);
    }
    const options = tslib_1.__rest(schema, []);
    const unparsedRemotes = mfeConfig.remotes.length > 0 ? mfeConfig.remotes : [];
    const remotes = unparsedRemotes.map((a) => (Array.isArray(a) ? a[0] : a));
    const devServeRemotes = !options.devRemotes
        ? []
        : Array.isArray(options.devRemotes)
            ? options.devRemotes
            : [options.devRemotes];
  const remotePorts= [];
    for (const remote of remotes) {
      const isDev = devServeRemotes.includes(remote);
      const target = isDev ? 'serve' : 'serve-static';
      remotePorts.push(workspaceConfig.projects[remote]?.targets[target]?.options.port ?? 4200);

        (0, ngcli_adapter_1.scheduleTarget)(context.workspaceRoot, {
            project: remote,
            target: isDev ? 'serve' : 'serve-static',
            configuration: context.target.configuration,
            runOptions: {},
            executor: context.builder.builderName,
        }, options.verbose);
    }

    process.on('exit', () => {
      remotePorts.forEach(port => killPort(port));
    });

    return (0, webpack_server_impl_1.webpackServer)(options, context);
}
exports.moduleFederationDevServer = moduleFederationDevServer;
exports.default = (0, architect_1.createBuilder)(moduleFederationDevServer);
//# sourceMappingURL=module-federation-dev-server.impl.js.map
`;

writeFileSync(
  join(
    workspaceRoot,
    '/node_modules/',
    '@nrwl/angular/src/builders/module-federation-dev-server/module-federation-dev-server.impl.js'
  ),
  mfDevServerReplacement
);
