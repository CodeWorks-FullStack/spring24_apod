


export class Apod {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl || data.hdurl
    this.description = data.description || data.explanation
    this.author = data.author || data.copyright
    this.date = data.date.includes('T') ? new Date(data.date) : new Date(data.date.replaceAll('-', '/')) // for apod searching purposes, we are leaving this as a string
    this.dateFixed = new Date(data.date.replaceAll('-', '/'))// js date constructor has a "glitch in the matrix", for whatever reason if you created a date with -, then you will get yesterday, but / you will get today
    this.creatorId = data.creatorId
  }

  get ActiveApodTemplate() {
    return `
 <div class="row justify-content-center text-light text-shadow fs-5 ">
   <div class="col-md-8">
     <h1 class="text-end secret-hover">${this.date.toDateString()} <button onclick="app.SandboxController.saveApod()" title="save apod to sandbox" class="btn btn-outline-light"><i class="mdi mdi-floppy"></i></button></h1>
     <div class="reveal">
      <p>${this.description}</p>
      <p class="text-info">${this.author}</p>
     </div>
   </div>
 </div>
 `
  }

  get MyApodListTemplate() {
    return `
<div class="col-12">
  <div onclick="app.SandboxController.setActiveApod('${this.id}')" class="d-flex justify-content-between align-items-center border border-primary rounded mb-2 p-2 selectable">
    <h4>${this.date.toLocaleDateString()}</h4><img class="apod-thumbnail" src="${this.imgUrl}" alt="">
    <button class="btn btn-danger" title="Delete Favorite APOD" onclick="app.SandboxController.deleteApod('${this.id}')"><i class="mdi mdi-delete-alert"></i> </button>
  </div>
</div>
`
  }
}



/**
 * date: String, required
imgUrl: String, required
creatorId: String (References Account Id), required
*creator: Object (Virtual Added by Database)
description: String, 
author: Object, 
originalId: String, 
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */