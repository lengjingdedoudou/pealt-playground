const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpClean = require('gulp-clean');
const del = require('del');
const minimist = require('minimist');
const path = require('path');
const childProcess = require('child_process');

const root = path.resolve(__dirname, './');
const envCachePath = 'node_modules/.envc';
const knownOptions = { string: 'env', default: { env: process.env.NODE_ENV } };
const options = minimist(process.argv.slice(2), knownOptions);

/** 打包前清空env cache文件夹 */
function cleanEnvCache() {
	return gulp.src(envCachePath, { read: false, allowEmpty: true }).pipe(gulpClean());
}

/** 复制env文件到cache文件夹 `common.ts`放置公共env配置 */
function copyEnvToCache() {
	return gulp.src('src/environments/**/*', { ignore: ['common.ts'] }).pipe(gulp.dest(envCachePath));
}

/** 重命名env文件 */
function renameEnv() {
	return gulp
		.src(`src/environments/environment${options.env ? '.' + options.env : ''}.ts`)
		.pipe(gulpRename('environment.ts'))
		.pipe(gulp.dest('src/environments/'));
}

/** 删除其他env文件 */
function delOtherEnv(cb) {
	del([
		// 这里我们使用一个通配模式来匹配 `environments` 文件夹中的所有东西
		'src/environments/**/*',
		// 我们不希望删掉这个文件，所以我们取反这个匹配模式
		`!src/environments/environment.ts`,
		// 其他文件
		`!src/environments/type.ts`,
		`!src/environments/common.ts`
	])
		.then(() => {
			cb();
		})
		.catch(error => {
			rollback('[delOtherEnv]', error);
		});
}

/** 编译打包 */
function buildApp(cb) {
	childProcess.exec('npm run final-build', { cwd: root }, function (error, stdout, stderr) {
		if (error || stderr.trim()) {
			rollback('[buildApp]', error || stderr.trim());
		} else {
			cb();
		}
	});
}

/** 还原env文件 */
function restoreEnvByCache() {
	return gulp.src(`${envCachePath}/**/*`).pipe(gulp.dest('src/environments'));
}

/** 出错回滚 */
function rollback(...args) {
	restoreEnvByCache().on('end', function () {
		console.log('%c [error] --> ', 'color:red', ...args);
		throw new Error('stop build');
	});
}

exports.build = gulp.series(cleanEnvCache, copyEnvToCache, renameEnv, delOtherEnv, buildApp, restoreEnvByCache);
