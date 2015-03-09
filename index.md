---
layout: default
title: BurgerMenu - jQuery mobile menu
slug: home
---

# Formikation

### Simple form beautifier

*Formikation* is a simple jQuery plugin to beautify form inputs with some css.

The elements to work with are:

`input:checkbox`

`input:radiobutton`

`input:file`

`select`

### Demo

Take a look to [online demo](http://vortizhe.github.io/formikation/examples.html), there are some examples with diferent themes.

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

## Apply default theme

The default theme included with Formikation depends on `.formikation` class on a parent element. Just add `.formikation` to the form or a wrapper div:

```html
    <form action="/" class="formikation" >
    ...
```

If you want to develop your own theme, take a look to `src/formikation.scss` it is very easy, do not require to much work to customize.


## Initialization

Call Formikation jQuery plugin on ready function:

```js
$(function() {

  $('.formikation').find('select, input:file, input:checkbox, input:radio').formikation();

});
```

## IE8

IE8 has some dificults on repainting `:before` and `:after` pseudo-elements after change checkbox or radiobuttons status.

Is simple to fix it, just change pseudo-element content from `''` to `' '` _(this fix is applied on default theme)_.
