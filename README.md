# mystem-wrapper

The only one clean, simple and performant Yandex `mystem` app wrapper module.

Read about `mystem` [here](https://tech.yandex.ru/mystem/). Shorly,
application `mystem` does morphological analysis of texts written in Russian
language.

## Installation

```bash
npm i mystem-wrapper --save
```

`mystem` app binary file will be downloaded to `vendor` subfolder of `mystem`
 module's folder. Binaries retrieved from [here](https://tech.yandex.ru/mystem/).
 To use custom binary set `MYSTEM_PATH` env variable.


## Usage

There are three methods: `analyze(text)`, `start(params)` and `close()`.
`start` and `analyze` both return promise (in first case promise will be resolved with analysis results).

```js
var mystem = require('mystem-wrapper');
var myStemProcParams = 'il'
mystem.start(myStemProcParams)

mystem
	.analyze('Жили у бабуси два веселых гуся.')
	.then(console.log)
	.catch(console.error)
	.finally(mystem.close);
```

for params read [doc](https://tech.yandex.ru/mystem/doc/usage-examples-docpage/)

## License

MIT
