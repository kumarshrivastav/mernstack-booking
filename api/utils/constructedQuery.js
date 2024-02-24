const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};
  if (queryParams?.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }
  if (queryParams?.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }
  if (queryParams?.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }
  if (queryParams?.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }
  if (queryParams?.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }
  if (queryParams?.stars) {
    const starRating = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : parseInt(queryParams.stars);
      constructedQuery.starRating={$in:starRating}
  }
  
  if(queryParams?.maxPrice){
    constructedQuery.pricePerNight={
        $lte:parseInt(queryParams.maxPrice).toString(),
    }
  }
  console.log(constructedQuery)
  return constructedQuery;
};

export default constructSearchQuery;