
const objeto = {};

$(function () {
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
getApiStatus();
getPlacesByAmenities();
});

function getApiStatus() {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
        }
      }
    }
    );
}

function getPlacesByAmenities () {
  $.ajax(
    'http://0.0.0.0:5001/api/v1/places_search/', {
    data: JSON.stringify({amenities: Object.keys(objeto)}),
    headers: { 'Content-Type': 'application/json' },
    type: 'POST',
    success: data => {
      $('SECTION.places').empty();
      for (const place of data) {
        const article = ['<article>',
        '<div class="title_box">',
          `<h2>${place.name}</h2>`,
          `<div class="price_by_night">$${place.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
          `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
          `${place.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
  });
}
