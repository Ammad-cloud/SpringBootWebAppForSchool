function addStudentToHTMLDOM(student){
    let supervisorOption = $("#supervisorIdSelected").clone().attr('id', "supervisorSelectForStudent" + student.id);
    $('<tr>').append(
    $("<td type='text' id='studentId' value=" + student.id + ">").append(student.id),
    $("<td><input class='form-control' name='studentName' type='text' value='" + student.name + "'>"), //value is put into string because name can contain whitespace
    $("<td><input class='form-control' name='studentEmail' type='text' value=" + student.email +  ">"),
    $("<td name='supervisorName' type='text' value='" + student.supervisor.name +  "'>").append(student.supervisor.name), //value is put into a string because the name can contain whitespace
    $("<td>").append(supervisorOption.val(student.supervisor.id)),
    $("<td><button type='submit' class='btn btn-danger' onclick='deleteStudent(this.value)' value=" + student.id + ">" + "Delete</button>"),
    $("<td><button type='submit' class='btn btn-primary' onclick='updateStudent(this.value)' value=" + student.id + ">" + "Update</button>"),
    $("<input name='supervisorId' type='hidden' value='" + student.supervisor.id +  "'>")
    ).appendTo('#table');
}

function getStudents(){
    console.log("getStudents is called");
    $.ajax({
        url:"/api/students",
        type: "GET",
        contentType: "application/JSON",
        success: function(studentSet){
            $.each(studentSet, function (index, student){
                addStudentToHTMLDOM(student);
            })
        },
        error: function (data){
            console.log("Error in response from server on getStudents");
        }
    })
}

function preventCreateStudentForSending(form){
    form.submit(function (event){
        event.preventDefault();
        createStudent();
    })
}

function createStudentObject(supervisorId, supervisorName, studentName, studentEmail){
    return { //returns a JS object
        name: studentName,
        email: studentEmail,
        supervisor: {
            id: supervisorId,
            name: supervisorName
        }
    };
}

function createStudent(){
    let studentObject = createStudentObject($("#supervisorIdSelected").val(),
                        $("#supervisorIdSelected option:selected").text(),
                        $("#studentNameInputField").val(), $("#studentEmailInputField").val());
    console.log(studentObject);
    $.ajax({
        url:"/api/createStudent",
        type: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(studentObject),
        success: function(studentObject){
            addStudentToHTMLDOM(studentObject);
        },
        error: function (){
            console.log("Error in response from server on createStudent");
        }
    })
}

function deleteStudent(studentId){
    $.ajax({
        url:"api/deleteStudent/" + studentId,
        method: "DELETE",
        success: function(){
            $('button[value=' + studentId + ']').parent().parent().remove();
        },
        error: function (){
            console.log("Error in response from server on deleteStudent");
        }
    })
}

function updateStudent(studentId){
    let studentRow = $('button[value=' + studentId + ']').parent().parent().children();
    let studentObject = createStudentObject($("#supervisorSelectForStudent" + studentId).val(),
        studentRow.children('input[name = supervisorName]').val(),
        studentRow.children('input[name = studentName]').val(),
        studentRow.children('input[name = studentEmail]').val());
    $.ajax({
        url:"/api/updateStudent/" + studentId,
        type: "PUT",
        contentType: "application/JSON",
        data: JSON.stringify(studentObject),
        success: function(data){
            updateTableOnChange(studentRow)
        },
        error: function (){
            console.log("Error in response from server on updateStudent");
        }
    })
}

function updateTableOnChange(studentRow){
    studentRow.parent().css("background-color", "#ccff66");
    studentRow.parent().append("<td id='message'></td>");
    let updatedSupervisorNameValue =  studentRow[4].children[0].selectedOptions[0].innerText; //find better solution
    studentRow.parent().children('td[name= supervisorName]').text(updatedSupervisorNameValue);
    $("#message").fadeIn().html("Updated");
    setTimeout(function (){
        $("#message").remove();
        studentRow.parent().css("background-color", "");
    }, 1000);
}