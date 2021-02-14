$(function () {
  const objeto = {};
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      // $(this) has a value of the html child in this case is input
      // to get the value of a tag html inside of input we use the method attr()
      objeto[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete objeto[$(this).attr('data-id')];
    }
    console.log(objeto);
    let arr = '';
    let separator = '';
    for (const i in objeto) {
      arr += separator;
      arr += objeto[i];
      separator = ', ';
    }
    $('div.amenities h4').text(arr);
  });
});
