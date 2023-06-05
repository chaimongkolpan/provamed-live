const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let ramdomInterval = null;
let customers = [];
let master_data = [];
let lucky1_limit = 1;
let lucky3_limit = 2;
let lucky10_limit = 10;
let lucky20_limit = 20;
let lucky1_count = 0;
let lucky3_count = 0;
let lucky10_count = 0;
let lucky20_count = 0;
let lucky1 = [];
let lucky3 = [];
let lucky10 = [];
let lucky20 = [];
$(document).ready(function() {
    function readFile() {
        let file = $('#customer-file')[0].files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'array'
            });
            workbook.SheetNames.forEach(function(sheetName) {
                if (sheetName == 'ImportName') {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    console.log(XL_row_object);
                    for (let i = 0;i < XL_row_object.length;i++) master_data.push(i)
                    customers = XL_row_object;
                } else {
                    if (workbook.SheetNames.length == 1) {
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        console.log(XL_row_object);
                        for (let i = 0;i < XL_row_object.length;i++) master_data.push(i)
                        customers = XL_row_object;
                    }
                }
            });

        };
        reader.onerror = function(ex) {
            alert(ex);
            console.log(ex);
        };
        reader.readAsArrayBuffer(file);
    }
    function random_number() {
        let ind = Math.floor(Math.random() * parseInt(master_data.length))
        let num = master_data[ind]
        master_data.splice(ind, 1)
        return num
    }
    function get_ramdom(num) {
        let result = [];
        for(let i = 0;i < num;i++) result.push(random_number());
        return result;
    }
    function number_to_text(num) {
        let txt = ('000' + num.toString()).slice(-3);
        return txt;
    }
    function run_number(name) {
        let txt = number_to_text(Math.floor(Math.random() * parseInt(customers.length)) + 1);
        $(name + "_1").text(txt[0]);
        $(name + "_2").text(txt[1]);
        $(name + "_3").text(txt[2]);
    }
    function set_number(name, num) {
        let txt = number_to_text(num);
        $(name + "_1").text(txt[0]);
        $(name + "_2").text(txt[1]);
        $(name + "_3").text(txt[2]);
    }
    function get_name(num) {
        let fname = customers[num]['Firstname'];
        let lname = customers[num]['Lastname'];
        return fname + ' ' + lname.substring(0,3) + 'XXX';
    }
    function gen_p_tag(i, name, num) {
        return '<p>' + (i==10 ? '10.' : i + '. ') + name + ' ( ' + num + ' )';
    }
    function random1() {
        lucky1 = lucky1.concat(get_ramdom(1));
        let counttime = 50;
        var runningRender = setInterval(function(){
            if (counttime > 0) {
                run_number('#num_1');
            }
            counttime--
        }, 100);
        setTimeout(function(){
            clearInterval(runningRender);
            $('#sum-1').empty();
            $('#sum-1').append('<h2>รายชื่อผู้โชคดี</h2>');
            for(let i in lucky1) {
                let name = get_name(lucky1[i]);
                set_number('#num_1', customers[lucky1[i]]['No']);
                $('#sum-1').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky1[i]]['No']));
            }
        },counttime * 100 + 100);
    }
    function random3() {
        lucky3 = lucky3.concat(get_ramdom(1));
        let counttime = 50;
        var runningRender = setInterval(function(){
            if (counttime > 0) {
                run_number('#num_3');
            }
            counttime--
        }, 100);
        setTimeout(function(){
            clearInterval(runningRender);
            $('#sum-3').empty();
            $('#sum-3').append('<h2>รายชื่อผู้โชคดี</h2>');
            for(let i in lucky3) {
                let name = get_name(lucky3[i]);
                set_number('#num_3', customers[lucky3[i]]['No']);
                $('#sum-3').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky3[i]]['No']));
            }
        },counttime * 100 + 100);
    }
    function random5() {
        lucky10 = lucky10.concat(get_ramdom(5));
        $('#sum-5').empty();
        $('#sum-5').append('<h2>รายชื่อผู้โชคดี</h2>');
        for(let i in lucky10) {
            if (i < lucky10_count - 5) {
                let name = get_name(lucky10[i]);
                $('#sum-5').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky10[i]]['No']));
            }
        }
        let counttime1 = 50;
        let counttime2 = 60;
        let counttime3 = 70;
        let counttime4 = 80;
        let counttime5 = 90;
        var runningRender1 = setInterval(function(){
            if (counttime1 > 0) {
                run_number('#num_5_1');
            }
            counttime1--
        }, 100);
        var runningRender2 = setInterval(function(){
            if (counttime2 > 0) {
                run_number('#num_5_2');
            }
            counttime2--
        }, 100);
        var runningRender3 = setInterval(function(){
            if (counttime3 > 0) {
                run_number('#num_5_3');
            }
            counttime3--
        }, 100);
        var runningRender4 = setInterval(function(){
            if (counttime4 > 0) {
                run_number('#num_5_4');
            }
            counttime4--
        }, 100);
        var runningRender5 = setInterval(function(){
            if (counttime5 > 0) {
                run_number('#num_5_5');
            }
            counttime5--
        }, 100);
        setTimeout(function(){
            clearInterval(runningRender1);
            set_number('#num_5_1', customers[lucky10[lucky10_count - 5]]['No']);
            let name = get_name(lucky10[lucky10_count - 5]);
            $('#sum-5').append(gen_p_tag(parseInt(lucky10_count - 5) + 1, name, customers[lucky10[lucky10_count - 5]]['No']));
        },counttime1 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender2);
            set_number('#num_5_2', customers[lucky10[lucky10_count - 4]]['No']);
            let name = get_name(lucky10[lucky10_count - 4]);
            $('#sum-5').append(gen_p_tag(parseInt(lucky10_count - 4) + 1, name, customers[lucky10[lucky10_count - 4]]['No']));
        },counttime2 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender3);
            set_number('#num_5_3', customers[lucky10[lucky10_count - 3]]['No']);
            let name = get_name(lucky10[lucky10_count - 3]);
            $('#sum-5').append(gen_p_tag(parseInt(lucky10_count - 3) + 1, name, customers[lucky10[lucky10_count - 3]]['No']));
        },counttime3 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender4);
            set_number('#num_5_4', customers[lucky10[lucky10_count - 2]]['No']);
            let name = get_name(lucky10[lucky10_count - 2]);
            $('#sum-5').append(gen_p_tag(parseInt(lucky10_count - 2) + 1, name, customers[lucky10[lucky10_count - 2]]['No']));
        },counttime4 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender5);
            set_number('#num_5_5', customers[lucky10[lucky10_count - 1]]['No']);
            let name = get_name(lucky10[lucky10_count - 1]);
            $('#sum-5').append(gen_p_tag(parseInt(lucky10_count - 1) + 1, name, customers[lucky10[lucky10_count - 1]]['No']));
        },counttime5 * 100 + 100);
    }
    function random20() {
        lucky20 = lucky20.concat(get_ramdom(5));
        $('#sum-20').empty();
        $('#sum-20').append('<h2>รายชื่อผู้โชคดี</h2>');
        for(let i in lucky20) {
            if (i < lucky20_count - 5) {
                let name = get_name(lucky20[i]);
                $('#sum-20').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky20[i]]['No']));
            }
        }
        let counttime1 = 50;
        let counttime2 = 60;
        let counttime3 = 70;
        let counttime4 = 80;
        let counttime5 = 90;
        var runningRender1 = setInterval(function(){
            if (counttime1 > 0) {
                run_number('#num_20_1');
            }
            counttime1--
        }, 100);
        var runningRender2 = setInterval(function(){
            if (counttime2 > 0) {
                run_number('#num_20_2');
            }
            counttime2--
        }, 100);
        var runningRender3 = setInterval(function(){
            if (counttime3 > 0) {
                run_number('#num_20_3');
            }
            counttime3--
        }, 100);
        var runningRender4 = setInterval(function(){
            if (counttime4 > 0) {
                run_number('#num_20_4');
            }
            counttime4--
        }, 100);
        var runningRender5 = setInterval(function(){
            if (counttime5 > 0) {
                run_number('#num_20_5');
            }
            counttime5--
        }, 100);
        setTimeout(function(){
            clearInterval(runningRender1);
            set_number('#num_20_1', customers[lucky20[lucky20_count - 5]]['No']);
            let name = get_name(lucky20[lucky20_count - 5]);
            $('#sum-20').append(gen_p_tag(parseInt(lucky20_count - 5) + 1, name, customers[lucky20[lucky20_count - 5]]['No']));
        },counttime1 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender2);
            set_number('#num_20_2', customers[lucky20[lucky20_count - 4]]['No']);
            let name = get_name(lucky20[lucky20_count - 4]);
            $('#sum-20').append(gen_p_tag(parseInt(lucky20_count - 4) + 1, name, customers[lucky20[lucky20_count - 4]]['No']));
        },counttime2 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender3);
            set_number('#num_20_3', customers[lucky20[lucky20_count - 3]]['No']);
            let name = get_name(lucky20[lucky20_count - 3]);
            $('#sum-20').append(gen_p_tag(parseInt(lucky20_count - 3) + 1, name, customers[lucky20[lucky20_count - 3]]['No']));
        },counttime3 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender4);
            set_number('#num_20_4', customers[lucky20[lucky20_count - 2]]['No']);
            let name = get_name(lucky20[lucky20_count - 2]);
            $('#sum-20').append(gen_p_tag(parseInt(lucky20_count - 2) + 1, name, customers[lucky20[lucky20_count - 2]]['No']));
        },counttime4 * 100 + 100);
        setTimeout(function(){
            clearInterval(runningRender5);
            set_number('#num_20_5', customers[lucky20[lucky20_count - 1]]['No']);
            let name = get_name(lucky20[lucky20_count - 1]);
            $('#sum-20').append(gen_p_tag(parseInt(lucky20_count - 1) + 1, name, customers[lucky20[lucky20_count - 1]]['No']));
        },counttime5 * 100 + 100);
    }
    $("#export").click(function() {
        var workbook = XLSX.utils.book_new();
        // let data1 = [["เลขที่นั่ง","รายชื่อ"]]
        // for(let i in lucky1) {
        //     data1.push([customers[lucky1[i]]['No'], customers[lucky1[i]]['Firstname'] + ' ' + customers[lucky1[i]]['Lastname']]);
        // }
        // var worksheet1 = XLSX.utils.aoa_to_sheet(data1);
        // workbook.SheetNames.push("ผู้โชคดี1");
        // workbook.Sheets["ผู้โชคดี1"] = worksheet1;

        let data3 = [["เลขที่นั่ง","รายชื่อ"]]
        for(let i in lucky3) {
            data3.push([customers[lucky3[i]]['No'], customers[lucky3[i]]['Firstname'] + ' ' + customers[lucky3[i]]['Lastname']]);
        }
        var worksheet3 = XLSX.utils.aoa_to_sheet(data3);
        workbook.SheetNames.push("ผู้โชคดี 2 ท่าน");
        workbook.Sheets["ผู้โชคดี 2 ท่าน"] = worksheet3;

        let data10 = [["เลขที่นั่ง","รายชื่อ"]]
        for(let i in lucky10) {
            data10.push([customers[lucky10[i]]['No'], customers[lucky10[i]]['Firstname'] + ' ' + customers[lucky10[i]]['Lastname']]);
        }
        var worksheet10 = XLSX.utils.aoa_to_sheet(data10);
        workbook.SheetNames.push("ผู้โชคดี 10 ท่าน");
        workbook.Sheets["ผู้โชคดี 10 ท่าน"] = worksheet10;

        let data20 = [["เลขที่นั่ง","รายชื่อ"]]
        for(let i in lucky20) {
            data10.push([customers[lucky20[i]]['No'], customers[lucky20[i]]['Firstname'] + ' ' + customers[lucky20[i]]['Lastname']]);
        }
        var worksheet20 = XLSX.utils.aoa_to_sheet(data10);
        workbook.SheetNames.push("ผู้โชคดี 20 ท่าน");
        workbook.Sheets["ผู้โชคดี 20 ท่าน"] = worksheet20;

        XLSX.writeFile(workbook, "ผู้โชคดี.xlsx");
        var xlsblob = new Blob(
        [new Uint8Array(XLSX.write(workbook, { bookType: "xlsx", type: "array" }))],
        {type:"application/octet-stream"}
        );
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            let url = window.URL.createObjectURL(xlsblob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    });
    function changeRandomBtn1(name, callback) {
        let count = 1;
        ramdomInterval = setInterval(() => {
            if (count > 0 && count < 7){
                if (count % 2 == 0)
                    $(name).css('background-image',"url('./random_btn-" + (4 - parseInt(count/2)) + ".png')");
                else 
                    $(name).css('background-image',"url('./empty_btn.png')");
            }
            else if (count == 7) {
                $(name).css('background-image',"url('./random_btn.png')");
                lucky1_count++;
                if (lucky1_count == lucky1_limit)
                    $(name).attr('disabled', 'disabled');
                clearInterval(ramdomInterval);
                callback();
            }
            count += 1;
        }, 500);
    }
    function changeRandomBtn3(name, callback) {
        let count = 1;
        ramdomInterval = setInterval(() => {
            if (count > 0 && count < 7){
                if (count % 2 == 0)
                    $(name).css('background-image',"url('./random_btn-" + (4 - parseInt(count/2)) + ".png')");
                else 
                    $(name).css('background-image',"url('./empty_btn.png')");
            }
            else if (count == 7) {
                $(name).css('background-image',"url('./random_btn.png')");
                lucky3_count++;
                if (lucky3_count == lucky3_limit)
                    $(name).attr('disabled', 'disabled');
                clearInterval(ramdomInterval);
                callback();
            }
            count += 1;
        }, 500);
    }
    function changeRandomBtn5(name, callback) {
        let count = 1;
        ramdomInterval = setInterval(() => {
            if (count > 0 && count < 7){
                if (count % 2 == 0)
                    $(name).css('background-image',"url('./random_btn-" + (4 - parseInt(count/2)) + ".png')");
                else 
                    $(name).css('background-image',"url('./empty_btn.png')");
            }
            else if (count == 7) {
                $(name).css('background-image',"url('./random_btn.png')");
                lucky10_count += 5;
                if (lucky10_count == lucky10_limit)
                    $(name).attr('disabled', 'disabled');
                clearInterval(ramdomInterval);
                callback();
            }
            count += 1;
        }, 500);
    }
    function changeRandomBtn20(name, callback) {
        let count = 1;
        ramdomInterval = setInterval(() => {
            if (count > 0 && count < 7){
                if (count % 2 == 0)
                    $(name).css('background-image',"url('./random_btn-" + (4 - parseInt(count/2)) + ".png')");
                else 
                    $(name).css('background-image',"url('./empty_btn.png')");
            }
            else if (count == 7) {
                $(name).css('background-image',"url('./random_btn.png')");
                lucky20_count += 5;
                if (lucky20_count == lucky20_limit)
                    $(name).attr('disabled', 'disabled');
                clearInterval(ramdomInterval);
                callback();
            }
            count += 1;
        }, 500);
    }
    $("#start-btn").click(function() {
        if(/*((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) && */$('#customer-file')[0].files.length > 0) {
            readFile();
            $('#container-prepare').hide();
            $('#container-1').hide();
            $('#container-3').show();
            $('#container-5').hide();
            $('#container-20').hide();
            $('#container-summary').hide();
        } else {
            alert('Please upload file.');
        }
    });
    $("#random-1-btn").click(function() {
        changeRandomBtn1('#random-1-btn', random1);
    });
    $("#random-3-btn").click(function() {
        changeRandomBtn3('#random-3-btn', random3);
    });
    $("#random-5-btn").click(function() {
        changeRandomBtn5('#random-5-btn', random5);
    });
    $("#random-20-btn").click(function() {
        changeRandomBtn20('#random-20-btn', random20);
    });
    $("#next-to-3").click(function() {
        $('#container-1').hide();
        $('#container-5').hide();
        $('#container-3').show();
        $('#container-summary').hide();
    });
    $("#prev-to-1").click(function() {
        $('#container-1').show();
        $('#container-3').hide();
        $('#container-5').hide();
        $('#container-summary').hide();
    });
    $("#next-to-5").click(function() {
        $('#container-1').hide();
        $('#container-3').hide();
        $('#container-5').show();
        $('#container-20').hide();
        $('#container-summary').hide();
    });
    $("#prev-to-3").click(function() {
        $('#container-1').hide();
        $('#container-3').show();
        $('#container-5').hide();
        $('#container-20').hide();
        $('#container-summary').hide();
    });
    $("#next-to-20").click(function() {
        $('#container-1').hide();
        $('#container-3').hide();
        $('#container-5').hide();
        $('#container-20').show();
        $('#container-summary').hide();
    });
    $("#summary-btn").click(function() {
        $('#container-1').hide();
        $('#container-3').hide();
        $('#container-5').hide();
        $('#container-20').hide();
        $('#container-summary').show();
        // $('.summary-1').empty();
        // for(let i in lucky1) {
        //     let name = get_name(lucky1[i]);
        //     $('.summary-1').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky1[i]]['No']));
        // }
        $('.summary-3').empty();
        for(let i in lucky3) {
            let name = get_name(lucky3[i]);
            $('.summary-3').append(gen_p_tag(parseInt(i) + 1, name, customers[lucky3[i]]['No']));
        }
        $('#summary-10-left').empty();
        $('#summary-10-right').empty();
        for(let i in lucky10) {
            let name = get_name(lucky10[i]);
            let id = '#summary-10-left';
            if (parseInt(i) >= 5) id = '#summary-10-right';
            $(id).append(gen_p_tag(parseInt(i) + 1, name, customers[lucky10[i]]['No']));
        }
        $('#summary-20-left').empty();
        $('#summary-20-right').empty();
        for(let i in lucky20) {
            let name = get_name(lucky20[i]);
            let id = '#summary-20-left';
            if (parseInt(i) >= 10) id = '#summary-20-right';
            $(id).append(gen_p_tag(parseInt(i) + 1, name, customers[lucky20[i]]['No']));
        }
    });
    $("#prev-to-5").click(function() {
        $('#container-1').hide();
        $('#container-3').hide();
        $('#container-5').show();
        $('#container-20').hide();
        $('#container-summary').hide();
    });
    $("#prev-to-20").click(function() {
        $('#container-1').hide();
        $('#container-3').hide();
        $('#container-5').hide();
        $('#container-20').show();
        $('#container-summary').hide();
    });
});