`use strict`

import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

const getID = () => {

  axios.get(`/read/${DOM.idInput.value}`)
    .then((response) => {
      console.log(response);
      DOM.idOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}
// POST function
const post = () => {
  axios.post(`/create`, {name : DOM.inputName.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const update = () => {
  axios.put(`/update/${DOM.idUpdate.value}`, {name: DOM.nameUpdate.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const remove = () => {
  axios.delete(`/delete/${DOM.idDelete.value}`)
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}
DOM.buttonCreate.onclick = () => post();
DOM.GetIdButton.onclick = () => getID();
DOM.updateButton.onclick = () => update();
DOM.deleteButton.onclick = () => remove();