function addStudentToHTMLDOM(student){
    $('<tr>').append(
    $("<td><input name='studentName' type='text' value='" + student.name + "'>"), //value is put into string because name can contain whitespace
    $("<td><input name='studentEmail' type='text' value=" + student.email +  ">"),
    $("<td><input name='supervisorName' type='text' value='" + student.supervisor.name +  "'>"), //supervisor name is put into a string because the name can contain whitespace
    $("<button type='submit' onclick='deleteStudent(this.value)' value=" + student.id + ">" + "Slet</button>"),
    $("<button type='submit' onclick='updateStudent(this.value)' value=" + student.id + ">" + "Opdatér</button>"),
    $("<td><input name='supervisorId' type='hidden' value='" + student.supervisor.id +  "'>"),
    $("<td type='hidden' id='studentId' value=" + student.id +  ">") // not used but added to function as a student identifier for convenience purposes in future
    ).appendTo('#table');
}

function getStudents(){
    console.log("getStudents is called");
    $.ajax({
        url:"/api/students",
        type: "GET",
        contentType: "application/JSON",
        success: function(data){
            $.each(data, function (index, student){
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
    let supervisorObject = {
        id : supervisorId,
        name : supervisorName
    }
    let studentObject = {
        name : studentName,
        email : studentEmail,
        supervisor : supervisorObject
    }
    return studentObject;
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
        success: function(data){
            addStudentToHTMLDOM(data);
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
            $('button[value=' + studentId + ']').parent().remove();
        },
        error: function (){
            console.log("Error in response from server on deleteStudent");
        }
    })
}

function updateStudent(studentId){
    let studentElement = $('button[value=' + studentId + ']').parent().children();
    let studentObject = createStudentObject(
        studentElement.children('input[name = supervisorId]').val(),
        studentElement.children('input[name = supervisorName]').val(),
        studentElement.children('input[name = studentName]').val(),
        studentElement.children('input[name = studentEmail]').val());
    $.ajax({
        url:"/api/updateStudent/" + studentId,
        type: "PUT",
        contentType: "application/JSON",
        data: JSON.stringify(studentObject),
        success: function(data){
            studentElement.parent().css("background-color", "palegreen");
            studentElement.parent().append("<h6 id='message'></h6>");
            $("#message").fadeIn().html("Updated");
            setTimeout(function (){
                $("#message").remove();
                studentElement.parent().css("background-color", "");
            }, 1000);
        },
        error: function (){
            console.log("Error in response from server on updateStudent");
        }
    })
}