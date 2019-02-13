## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-mix/providers/AssetsProvider'
]
```

Next setup your assets in `webpack.mix.js`. See [Laravel Mix Documentation](https://laravel-mix.com/docs/4.0/installation).
Then you can run 
```shell
$ adonis assets
``` 
to build assets.

## Example configuration

```js
mix.setPublicPath('public')

mix
  .js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/scss/app.scss', 'public/css')
```

## View Helper

Also `mix` view helper added.

```html
...
<head>
  {{ style(mix('css/app.css')) }} 
  {{ script(mix('js/app.js)) }}
</head>
...
```
