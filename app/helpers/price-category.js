import Ember from 'ember';

/**
* @name Price Category
* @desc Returns a price category value from Foursquare Api
* @return string
*/
export function priceCategory(params/*, hash*/) {

  if(!params[0]) { return ''; }

  const venue = params[0];

  if(venue.price){
    let priceTag = venue.price.currency.repeat(venue.price.tier);
    return priceTag;
  }

  if(venue.attributes.groups.findBy('name', 'Price')){
    const priceSummary = venue.attributes.groups.findBy('name', 'Price').summary;
    return priceSummary ? priceSummary : '';
  }

}

export default Ember.Helper.helper(priceCategory);
