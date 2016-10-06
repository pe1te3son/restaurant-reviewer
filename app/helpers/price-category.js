import Ember from 'ember';

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
