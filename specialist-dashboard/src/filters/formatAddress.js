export default function(address) {
    if (address && address.street && address.houseNumber && address.city) {
      return address.street + ' ' + address.houseNumber + ', ' + address.city;
    } 
  }