module.exports = {
    module: {
        name: 'pipSplit',
        styles: 'index',
        export: 'pip.split',
        standalone: 'pip.split'
    },
    build: {
        js: false,
        ts: false,
	    tsd: true,
	    bundle: true,
        html: false,
        sass: true,
        lib: true,
        images: true,
        dist: false
    },
    browserify: {
        entries: [
            './src/index.ts'
        ]
    },
    file: {
        lib: [
            './node_modules/pip-webui-all/dist/**/*'
        ]
    },
    samples: {
        port: 8080
    },
    api: {
        port: 8081
    }
};
