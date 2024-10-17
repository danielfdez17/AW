"use strict";

var firstValue;
var operator;

document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;

            if (this.name === 'data-number') {
                document.getElementById('result').value += this.value;
            } else if (this.name === 'data-opera') {    
                firstValue = document.getElementById('result').value;
                operator = value;
                document.getElementById('result').value = 0;
            } else if (this.name === 'data-delete') {
                document.getElementById('result').value = 0;
            } else if (this.name === 'data-igual') {
                document.getElementById('firstValue').value = firstValue;
                document.getElementById('operator').value = operator;
                document.getElementById('secondValue').value = document.getElementById('result').value;
                document.getElementById('formulario').submit();
            }
        });
    });
});

