
var table = document.getElementById("cell__container");
var flag = 1;
//number validation function
function n(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


//dollar sign function
[document.getElementById('input-f1'), document.getElementById("input-f2"), document.getElementById("input-f3")].forEach(function (element) {

    element.addEventListener('input', function () {


        if (this.id == "input-f1" || this.id == "input-f2") {
            this.value = '$' + this.value.replace(/[^\d\.]/g, '');

        }
        else {
            this.value = this.value.replace(/[^\d\.]/g, '') + '%';

        }

    })
})

function year() {

    const yr = document.getElementById("input-f4").value;
    document.getElementById("year1").textContent = yr;
    document.getElementById("year2").textContent = yr;
}

function dollar(p) {

    p = p.slice(1, p.length);
    p = p.replaceAll(',', '');
    return p;
}

function percent(p) {
    p = p.slice(0, p.length - 1);
    return p;
}
function stepup(elem) {

    if (elem.id == "minus-1") {

        let p = document.getElementById("input-f1").value;
        p = p.slice(1, p.length);
        p = p.replaceAll(',', '');
        // console.log(Number(p))

        p = p - 100;
        document.getElementById("input-f1").value = "$" + p;
        table_new();
    }

    else if (elem.id == "plus-1") {

        let p = document.getElementById("input-f1").value;
        p = p.slice(1, p.length);
        p = p.replaceAll(',', '');


        p = Number(p) + 100;
        document.getElementById("input-f1").value = "$" + p;
        table_new();
    }


    else if (elem.id == "minus-2") {

        let p = document.getElementById("input-f2").value;
        p = p.slice(1, p.length);
        p = p.replaceAll(',', '');


        p = p - 50;
        document.getElementById("input-f2").value = "$" + p;
        table_new();
    }

    else if (elem.id == "plus-2") {

        let p = document.getElementById("input-f2").value;
        p = p.slice(1, p.length);
        p = p.replaceAll(',', '');
        // console.log(Number(p))

        p = Number(p) + 50;
        document.getElementById("input-f2").value = "$" + p;
        table_new();
    }

    else if (elem.id == "minus-3") {

        let p = document.getElementById("input-f3").value;
        p = p.slice(0, p.length - 1);
        // p = p.replaceAll(',', '');
        // console.log(Number(p))

        p = p - 0.25;
        document.getElementById("input-f3").value = p + "%";
        table_new();
    }

    else if (elem.id == "plus-3") {

        let p = document.getElementById("input-f3").value;
        p = p.slice(0, p.length - 1);
        // p = p.replaceAll(',', '');
        // console.log(Number(p))

        p = Number(p) + 0.25;
        document.getElementById("input-f3").value = p + "%";
        table_new();
    }


    else if (elem.id == "minus-4") {

        let p = document.getElementById("input-f4").value;

        // console.log(Number(p))

        p = p - 1;
        document.getElementById("input-f4").value = p;

        table_new();
        year();
    }

    else if (elem.id == "plus-4") {

        let p = document.getElementById("input-f4").value;
        p = Number(p) + 1;
        document.getElementById("input-f4").value = p;

        table_new();
        year();
    }
}
//Effective Interest Rate
var Effective, result;
window.onload = () => {

    if (document.getElementById('radio1').checked) {
        var check = 12;
    }
    else {
        var check = 1;
    }

    let percent = document.getElementById("input-f3").value;
    percent = percent.slice(0, percent.length - 1);

    // console.log(Number(percent));
    percent = percent / 100;
    // console.log(percent)
    Effective = Math.pow((1 + percent / (1)), (1 / check)) - 1;
    console.log((Effective * 100).toFixed(3));

}
//Leading Zeros
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

//Number format ,
function format(num) {

    const Num_for = Intl.NumberFormat("en-US");
    const formatt = Num_for.format(num);

    return formatt;
}

//Arrays for chart//
var Array_year = [];
var Initial_Balance = [];
var Tot_Contributions = [];
var Tot_Interest = []

function table_new() {

    //table remove...to create new one
    $("#cell__container tr").remove();
    //update year in title
    year();

    let ne = document.getElementById("input-f4").value;


    var principle = Number(dollar(document.getElementById("input-f1").value));

    if (document.getElementById('radio1').checked) { check = 12; } else { check = 1; }

    console.log("here part2");
    let percent = document.getElementById("input-f3").value;
    percent = (percent.slice(0, percent.length - 1)) / 100;

    rate = Math.pow((1 + percent / (1)), (1 / check)) - 1;
    rate = Math.pow((1 + (rate / (check * ne))), (check * ne / 1)) - 1;
    var effective_rate = (rate * 100).toFixed(3) / 100;


    var p, starting, Annual, Cumulative = 0, Interest, Cumulative_interest = 0, Total;
    // var Cum_part=0;
    var yr = document.getElementById("input-f4").value;
    console.log(yr);
    for (i = 0; i < yr; i++) {

        //Column1
        p = addLeadingZeros(i + 1, 2); // table_new first element
        Array_year[i] = p;

        //Column 2

        if (i == 0) {                        //starting Amount.
            starting = principle;
        }
        else {
            starting = Total;
        }
        Initial_Balance[i] = starting;
        //Column3
        Annual = Number(dollar(document.getElementById("input-f2").value));
        Annual = Annual * check;


        //Column 4
        Cumulative = Annual + Cumulative;
        Tot_Contributions[i] = Cumulative;
        //Column 5
        if (check == 12) {
            Interest = Math.round(starting * effective_rate + starting * percent);
        }
        else {
            Interest = Math.round(starting * percent);
        }

        //Column 6
        Cumulative_interest = Math.round(Interest + Cumulative_interest);
        Tot_Interest[i] = Cumulative_interest;

        //Column 7
        Total = Math.round(starting + Annual + Interest);

        // console.log(p, starting, Annual, Cumulative, Interest, Cumulative_interest, Total);

        table_embed(p, starting, Annual, Cumulative, Interest, Cumulative_interest, Total);

    }

    var yr = document.getElementById("input-f4").value;
    var l3 = [0];
    var l2 = [0];
    for (var x = 0; x < yr; x++) {
        l3[x] = [];
        for (var y = 0; y < 4; y++) {
            l3[x][y] = x * y;
        }
    }


    // parseInt(Array_year).map((e,i) => [Array_year[i],Initial_Balance[0] , Tot_Contributions[i], Tot_Interest[i]])
    for (let i = 0; i < yr; i++) {
        for (let j = 0; j < 4; j++) {
            if (j == 0) {
                l3[i][j] = Array_year[i];
            }
            else if (j == 1) {
                l3[i][j] = Initial_Balance[0];
            }
            else if (j == 2) {
                l3[i][j] = Tot_Contributions[i];
            }
            else {
                l3[i][j] = Tot_Interest[i];
            }

        }
    }

    // console.log(Array_year, Initial_Balance, Tot_Contributions, Tot_Interest);


    l2 = l3.map(([Year, Initial, Contribution, Interest]) => ({ Year, Initial, Contribution, Interest }));
    chart(l2);


    // console.log(l2);
}
window.onload = table_new;

[document.getElementById('radio1'), document.getElementById("radio2")].forEach(function (element) {

    console.log('here')
    element.addEventListener('click', table_new)
})

document.getElementById("input-f3").addEventListener("input", table_new);
document.getElementById("input-f1").addEventListener("input", table_new);
document.getElementById("input-f2").addEventListener("input", table_new);
document.getElementById("input-f4").addEventListener("input", table_new);


function table_embed(p, starting, Annual, Cumulative, Interest, Cumulative_interest, Total) {
    //Table head elements 



    // Table body elements 
    var table_array = [p, starting, Annual, Cumulative, Interest, Cumulative_interest, Total];

    var newRow = table.insertRow(-1);
    var cell0 = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);
    var cell5 = newRow.insertCell(5);
    var cell6 = newRow.insertCell(6);


    var element_head = document.createElement("tr");
    element_head.setAttribute("class", "cell__row css-0");
    element_head.setAttribute("role", "row");

    newRow.appendChild(element_head);

    var element0 = document.createElement("td");
    element0.setAttribute("class", "cell cell__first css-1eyncsv");
    element0.setAttribute("role", "gridcell");
    element0.setAttribute("component", "th");
    element0.setAttribute("scope", "row");
    var content = document.createTextNode(table_array[0]);
    element0.appendChild(content);
    cell0.appendChild(element0);


    var element1 = document.createElement("td");
    element1.setAttribute("class", "cell css-1eyncsv");
    element1.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[1]));
    element1.appendChild(content);
    cell1.appendChild(element1);

    var element2 = document.createElement("td");
    element2.setAttribute("class", "cell cell--no-mobile css-1eyncsv");
    element2.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[2]));
    element2.appendChild(content);
    cell2.appendChild(element2);

    var element3 = document.createElement("td");
    element3.setAttribute("class", "cell cell--no-mobile cell--no-tablet css-1eyncsv");
    element3.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[3]));
    element3.appendChild(content);
    cell3.appendChild(element3);


    var element4 = document.createElement("td");
    element4.setAttribute("class", "cell cell--no-mobile css-1eyncsv");
    element4.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[4]));
    element4.appendChild(content);
    cell4.appendChild(element4);


    var element5 = document.createElement("td");
    element5.setAttribute("class", "cell cell--no-mobile cell--no-tablet css-1eyncsv");
    element5.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[5]));
    element5.appendChild(content);
    cell5.appendChild(element5);


    var element6 = document.createElement("td");
    element6.setAttribute("class", "cell css-1eyncsv");
    element6.setAttribute("role", "gridcell");
    var content = document.createTextNode("$" + format(table_array[6]));
    element6.appendChild(content);
    cell6.appendChild(element6);

    document.getElementById("my-result").textContent = "$" + format(table_array[6]);

    // chart(table_array);
    return;

}

function slide() {

    var sldd = document.getElementById("sld");
    var sldd2 = document.getElementById("sld2");
    sldd2.classList.remove("hide");
    sldd.classList.add("hide");

    var ic = document.getElementById("icon2");
    var ic2 = document.getElementById("icon1");

    ic.classList.remove("tab__item--inactive");
    ic2.classList.add("tab__item--inactive");

}

function slide2() {

    var sldd = document.getElementById("sld");
    var sldd2 = document.getElementById("sld2");
    sldd.classList.remove("hide");
    sldd2.classList.add("hide");

    var ic = document.getElementById("icon2");
    var ic2 = document.getElementById("icon1");

    ic2.classList.remove("tab__item--inactive");
    ic.classList.add("tab__item--inactive");

}





function chart(table_array) {

    // console.log((l2));
    document.getElementById("container").textContent = "";
    var dataSet = anychart.data.set(table_array);

    
    var mapping = dataSet.mapAs({'x': 'Year', 'value': 'Initial'});
    var mapping1 = dataSet.mapAs({'x': 'Year', 'value': 'Contribution'});
      var mapping2 = dataSet.mapAs({'x': 'Year', 'value': 'Interest'});
    // create a chart
    var chart = anychart.column();

    var series = chart.column(mapping2).name("Interest Earned");
    var series1 = chart.column(mapping1).name("Contributions");
    var series2 = chart.column(mapping).name("Initial Amount");    
    chart.yScale().stackMode('value');


    let palette = anychart.palettes.distinctColors();
    palette.items(
        ['rgb(153, 226, 37)' , 'rgb(82, 110, 255)','rgb(162, 46, 200)',]
    );
    chart.palette(palette);
          
 
    chart.yAxis().labels().format("${%value}");
    chart.yGrid().enabled(true)
    chart.animation(true,50);
    chart.title('Growth over time');
  
    var interactivity = chart.interactivity();
    interactivity.selectionMode("none");
    chart.container("container");
    chart.draw();



}

// function effective_value() {
//     if (document.getElementById('radio1').checked) {
//         var check = 12;
//     }
//     else {
//         var check = 1;
//     }

//     let percent = document.getElementById("input-f3").value;
//     percent = percent.slice(0, percent.length - 1);

//     // console.log(Number(percent));
//     percent = percent / 100;
//     // console.log(percent)
//     Effective = Math.pow((1 + percent / (1)), (1 / check)) - 1;
//     Effective = (Effective * 100).toFixed(3) / 100;
//     // console.log(Effective);

//     let pv = document.getElementById("input-f1").value;
//     let pmt = document.getElementById("input-f2").value;
//     let n = Number(document.getElementById("input-f4").value);

//     if (check == 12) {
//         n = n * check;
//     }
//     // n = n * check+0.59;
//     pv = pv.slice(1, pv.length);
//     pv = Number(pv.replaceAll(',', ''));

//     pmt = pmt.slice(1, pmt.length);
//     pmt = Number(pmt.replaceAll(',', ''));

//     // console.log(pv, pmt, n);
//     result = pv * Math.pow((1 + Effective / 1), n);
//     // + pmt * ((Math.pow((1 + Effective / 1), n) - 1) / Effective)

//     // console.log(result);


//     document.getElementById("my-result").textContent = "$" + format(parseInt(result));
// }

// [document.getElementById('radio1'), document.getElementById("radio2")].forEach(function (element) {

//     element.addEventListener('click', effective_value)
// })

// document.getElementById("input-f3").addEventListener("change", effective_value);
// document.getElementById("input-f1").addEventListener("change", effective_value);
// document.getElementById("input-f2").addEventListener("change", effective_value);
// document.getElementById("input-f4").addEventListener("change", effective_value);
// document.getElementById("input-f4").addEventListener("change", year);





// 


