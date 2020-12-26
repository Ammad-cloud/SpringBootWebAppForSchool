var studentIDGlobal; //global value due to onclick attribute

function addStudentToHTML(student){
    studentIDGlobal = student.id
        $('<tr>').append(
        $("<td id='name'><input type='text' value=" + student.name +  ">"),
        $("<td id='email'><input type='text' value=" + student.email +  ">"),
        $("<td id='supervisorName'><input type='text' value='" + student.supervisor.name +  "'>"), //supervisor name is put into a string because the name can contain whitespace
        $("<button type='submit' onclick='deleteStudent(this.value)' value=" + student.id + ">" + "Slet</button>"),
        $("<button type='submit' onclick='updateStudent(this.value)' value=" + student.id + ">" + "Opdatér</button>"),
        $("<td id='supervisorId'><input type='hidden' value='" + student.supervisor.id +  "'>"),
        $("<td id='studentId'><input type='hidden' id='studentId' value=" + student.id +  ">"), // added to identify on edit
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
                addStudentToHTML(student);
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
    let studentObject = createStudentObject($("#supervisorIdSelected").val(), $("#supervisorIdSelected option:selected").text(),
                        $("#studentName1").val(), $("#studentEmail1").val());
    console.log(studentObject);
    $.ajax({
        url:"/api/createStudent",
        type: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(studentObject),
        success: function(data){
            addStudentToHTML(data);
        },
        error: function (){
            console.log("Error in response from server on createStudent");
        }
    })
}

function deleteStudent(id){
    $.ajax({
        url:"api/deleteStudent/" + id,
        method: "DELETE",
        success: function(){
            $('button[value=' + id + ']').parent().remove();
        },
        error: function (){
            console.log("Error in response from server on deleteStudent");
        }
    })
}

function updateStudent(id){
    let studentElement = $('button[value=' + id + ']').parent();
    let studentObject = createStudentObject(studentElement.children('#supervisorId').children().val(),
                        studentElement.children('#supervisorName').children().val(),
                        studentElement.children('#name').children().val(),
                        studentElement.children('#email').children().val());
    console.log(studentObject);
    $.ajax({
        url:"/api/updateStudent/" + id,
        type: "PUT",
        contentType: "application/JSON",
        data: JSON.stringify(studentObject),
        success: function(data){
            studentElement.children('#supervisorId').prepend("<h6 id='message'></h6>");
            $("#message").fadeIn().html("Updated");
            setTimeout(function (){
                $("#message").remove();
            }, 1000);
        },
        error: function (){
            console.log("Error in response from server on updateStudent");
        }
    })
}