# mystem

Yandex `mystem` app wrapper module.

Read about `mystem` [here](https://tech.yandex.ru/mystem/). Shorly, application `mystem` does morphological analysis of texts written in Russian language.

## Installation

```bash
npm i mystem --save
```

Then put `mystem` app binary file (compiled for your OS) to `bin` subfolder of `mystem` module's folder. Binaries can be found [here](https://tech.yandex.ru/mystem/).

## Usage

There are two methods: `analyze(text)` and `close()`, both return promise (in first case promise will be resolved with analysis results).

```js
var mystem = require('mystem');

mystem
	.analyze('Жили у бабуси два веселых гуся.')
	.then(console.log)
	.catch(console.error)
	.finally(mystem.close);
```

## License

MIT
