export const reducer = (state,action) => {
  if(action.type === "data_global") return {...state,countryInfo:action.payload}
  else if(action.type === "LOAD") return {...state,isLoading:false}
  else if(action.type === "NOT_LOAD") return {...state,isLoading:false}
  else if(action.type === "WORLD_CENTER") return {...state,mapCenter:[16, -24],zoomCenter:3,suggestTable:[]}
  else if(action.type === "COUNTRY_CENTER") return {...state,mapCenter:action.payload,zoomCenter:5}
  else if(action.type === "DATA_COUNTRY") return {...state,suggestions:[],noAutoCountry:action.payload.value,countryInfo:action.payload.data,countryCode:action.payload.countryCode,suggestTable:state.suggestTable.filter(suggest => suggest.country === action.payload.value)}
  else if(action.type === "SUGGESTIONS") return {...state,suggestions:action.payload,suggestTable:action.payload}
  else if(action.type === "CASES" || action.type === "RECOVERED" || action.type === "DEATHS") return {...state,casesType:action.payload}
}