//Un livre
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._id = id;
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
  }

  get id() {
    return this._id;
  }

  get titre() {
    return this._titre;
  }
  get image() {
    return this._qtestock;
  }
  get prix() {
    return this._prix;
  }
  set qtestock(qtestock) {
    this._qtestock = qtestock;
  }
  pourAfficher() {
    return `${this._titre};  Stock : (${this._qtestock}); Prix Unitaire : (${this._prix}€)`;
  }
}
