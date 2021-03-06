'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  run: function(ok, ko) {
    this.logPiscoImage();

    let p =
      this.njkRender(
        './', //root where scaffold is created
        path.join(__dirname, 'scaffold'), //from
        this.params.recipeName, //to where scaffold is created
        this.params //vars
      )
      .then(() => {
        fs.renameSync(`${this.params.recipeName}/gitignore`, `${this.params.recipeName}/.gitignore`);
        if (this.params.recipeCIFile !== 'Jenkinsfile') {
          fs.unlinkSync(`${this.params.recipeName}/Jenkinsfile`);
        }
        if (this.params.recipeCIFile !== '.travis.yml') {
          fs.unlinkSync(`${this.params.recipeName}/.travis.yml`);
        }
      })
      .then(ok, ko);

    return p;
  }
};

