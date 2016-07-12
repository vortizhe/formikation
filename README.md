# Formikation

[![GitHub version](https://badge.fury.io/gh/vortizhe%2Fformikation.svg)](https://badge.fury.io/gh/vortizhe%2Fformikation)

### Simple form beautifier

*Formikation* is a simple jQuery plugin to beautify form inputs with some css.

The elements to work with are:

`input:checkbox`

`input:radiobutton`

`input:file`

`select`

### Demo

Take a look to [online demo](http://vortizhe.me/formikation/examples.html), there are some examples with diferent themes.

## HTML Requisites

The only html requisite is to style radiobuttons and checkboxes. Them must be wrapped by a `label`

```html
<label>
  <input type="checkbox" name="check" id="check">
  Checkbox label
</label>

<label>
  <input type="radio" name="radio" id="radio">
  Radio label
</label>
```

## Utility CSS

Formikation comes with a utility CSS that includes the neccessary CSS styles to work, without any visual styles on it. To add the utility CSS styles, add the `.formikation` class to yout form element this way:

```html
    <form action="/" class="formikation" >
    ...
```

## Themes

The visual styling of the formikation elements comes in an independet stylesheet, to keep separated the visual representation from the _utility_ classes. Two themes are included in the repository `.fk-theme-default` and `.fk-theme-switches`.

Include the `.fk-theme-default` class on the parent element along the base `.formikation` class, this way:

```html
    <form action="/" class="formikation fk-theme-default" >
    ...
```

If you want to develop your own theme, take a look to `src/themes/fk-theme-default.scss` and use it as base to do your own customization.


## Initialization

Call Formikation jQuery plugin on ready function:

```js
$(function() {

  $('form.formikation').find('select, input:file, input:checkbox, input:radio').formikation();

});
```

## Update elements with JS

If you need to update any formikation element with js, it’s necessary to trigger formikation.update event to get UI change reflected.
```js
// Active a checkbox
$('.form-element').prop('checked', true).trigger('formikation.update');
```

## IE8

IE8 has some dificults on repainting `:before` and `:after` pseudo-elements after change checkbox or radiobuttons status.

Is simple to fix it, just change pseudo-element content from `''` to `' '` _(this fix is applied on default theme)_.

## Changelog

* 0.2.6 (2016/05/XX) Added .fk-is-placeholder to select option without value
