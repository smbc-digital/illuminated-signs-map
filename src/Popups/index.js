import { getTargetUrl } from '../Helpers'

const signActivePopup = feature => {
  //const varName = getTargetUrl()

  return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.location_description}</p></div><hr/>
  <div class="item"><i class="tag fa fa-tag"></i><p class="title">Sign ID </p><p class="info">${feature.properties.feature_id}</p></div>
  <a class="button-primary" href="report-an-issue/lit-sign/fault-type?assetId=${feature.properties.central_asset_id}&siteCode=${feature.properties.site_code}">Report this sign</a>`
}

const signFaultPopup = feature => {
 const varName = getTargetUrl()
 let noOfDays = Math.floor(
   (new Date() - new Date(feature.properties.job_entry_date)) /
     (1000 * 3600 * 24)
 )
 let lastUpdated = Math.floor(
   (new Date() - new Date(feature.properties.logged_date)) / (1000 * 3600 * 24)
 )
 const defaultMessage = noOfDays
   ? `A fault with this sign was reported ${noOfDays} days ago`
   : 'A fault with this sign was reported'
 const showLastUpdated = lastUpdated
   ? `<div class="last-updated">Last updated ${lastUpdated} days ago</div>`
   : ''

 return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.location_description}</p></div><hr>
    <div class="item"><i class="tag fa fa-tag"></i><p class="title">Sign ID </p><p class="info">${feature.properties.feature_id}</p></div>
    <div class= "message-fault">${defaultMessage}</div>
    <a class="button-primary" href="${varName}/track-a-report/details/${feature.properties.ext_system_ref}">View reported fault</a>
    ${showLastUpdated}`

}

const signMaintenancePopup = feature => {
 const message =
   feature.properties.message ??
   'This sign is part of a maintenance programme and will be fixed without a need to report'

 return`<div class="item"><span class="iconify" data-icon="fa-map-marker" data-inline="false"></span></i><p class="title">Location </p><p class="info">${feature.properties.location_description}</p></div><hr>
    <div class="item"><i class="tag fa fa-tag"></i><p class="title">Sign ID </p><p class="info">${feature.properties.feature_id}</p></div>
    <div class= "message-maintenance">${message}</div>`

}

const illuminatedsignPopup = (feature, layer) => {
  var content = getcontent_sign(feature)

  layer.bindPopup(content)
}

const getcontent_sign = feature => {
  switch  (feature.properties.raise_new_job) {  
    case 1:
        return signActivePopup(feature)
    case 2:
        return signMaintenancePopup(feature)
    case 3:
        return signFaultPopup(feature)    
  }
}

export {
  illuminatedsignPopup 
}