
function categoryDataMaker (data) {
  
    // make list with indices and values
    var indexedData = data.map(function(e, i){return {ind: i, val: e}});

    // sort index/value couples, based on values
    indexedData.sort(function(x, y){return x.val < y.val ? 1 : x.val == y.val ? 0 : -1});
    
}