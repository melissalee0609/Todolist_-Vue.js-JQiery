//無內容物的預設提示字
function taskEmpty(){    
    var todolist = $(".todolist li")

    if(todolist.length==0){
        $('.todolist').append(
            '<p style="color: rgb(170, 170, 170); margin: 0px 0px 1.5rem;">'+
                'No task here...'+
            '</p>' 
            )
    }
}

//全部刪除出現的條件
function checkRemoveAllBtn(){
    var todolist = $(".todolist li")
    if (todolist.length>1){
        $('.remove a').css("display","inline-block")
    }
    else{
        $('.remove a').css("display","none")
    }
}

//確認全部刪除後的提示字
function checkEmpty(todolist){
    if (todolist.length < 1){
        $('.info').append(
            'Congratulations! No more task to do.'
        )
    }
    else{
        $('.info').empty()
    }
}

//渲染一條一條
function addTask(item,index){
        $('.todolist').append(
            '<li data-num='+index +'>'+
                '<div class ="list-task">'+
                    '<i class="fas fa-check-circle done" aria-hidden="true"></i>'+
                    '<span class="list-tag '+item.list_tag+'">'+item.list_tag+'</span>'+
                '</div>'+
                '<div>'+
                    '<span class="task-name" data-num='+index +'>'+
                        item.task_name+
                    '</span>'+
                    '<input type="text" class="modify-input" value='+item.task_name+'>'+
                    '<i class ="fas fa-pen modify" data-num='+index +' aria-hidden="true" style="padding: 0.8rem;"></i>'+
                    '<i class ="fas fa-trash delete" data-num='+index +' aria-hidden="true" style="padding: 0.8rem;"></i>'+
                '</div>'+
            '</li>'
        );
     
}

var todolist = [];
function addToTask(){
    // //新增至陣列中
     var list_tag = $('.tag-select').text();
     var task_name = $('.task-input').val();
     var list_task = {list_tag,task_name};

    
    //  var list_task = {}
    //  list_task.list_tag = $('.tag-select').text();
    //  list_task.task_name = $('.task-input').val();

     $('.list-tag').addClass(list_tag);
     todolist.push(list_task);

     //顯示的
     var tag =($('.chosen').text());
     //畫面清空
     $('.todolist').empty();

     if(tag == 'all'){
         todolist.forEach(function(item,index){
            addTask(item,index)
             $('li[data-num='+index+'] .modify-input').hide();
         })
     }
     else{
         todolist.forEach(function(item,index){
             if (item.list_tag == tag){
                addTask(item,index)
                $('li[data-num='+index+'] .modify-input').hide();
             }
         })
     }
     //清空輸入框
     checkEmpty(todolist)
     $('.task-input').val('');
     checkRemoveAllBtn();
 } 

//----------------------------------------------//
$(document).ready(function(){
    taskEmpty();

    //預設第一個被選取
    $('.tag:first').addClass("tag-select");

    //選擇標籤
    $('.tag').on('click',function(){
        if($('.tag').filter(".tag-select")){
            $('.tag').removeClass("tag-select")
        }         
        $(this).addClass("tag-select")
    });
    
    //新增標籤跟內容
    
    $('.add').on('click',addToTask)
    //按enter鍵也能新增
    $('.task-input').keydown(function(event){
        if(event.which == 13){
            addToTask();
        }
    })

    //標籤選項內容
    $('.type-selector').append(
        '<li class="option">private</li>'+
        '<li class="option">work</li>'+
        '<li class="option">family</li>'+
        '<li class="option">learning</li>'
    )

    //標籤選列開合
    $('#task-type').on('click',function(){
        $('ul').toggleClass('hide')        
    })

    //標籤選列選擇
    var tagtodolist = [];
    var type = 'all';
    $('.option').on('click',function(){
        type = $(this).text();
        $('.chosen').text(type);
        
        tagtodolist = [];//清空

        //顯示相對應的標籤內容
        $('.todolist').empty();
                
        if (type == 'all'){
            todolist.forEach(function(item,index){
                addTask(item,index)
                $('li[data-num='+index+'] .modify-input').hide();
            })
            checkRemoveAllBtn()
            empty()
        }
        else {
            todolist.forEach(function(item,index){
                if(type==item.list_tag){
                    addTask(item,index)
                    $('li[data-num='+index+'] .modify-input').hide();
                }
            })
            checkRemoveAllBtn()
            taskEmpty()

        }            
    });

    
    //標示為已完成
    $('.todolist').on("click","li",function(){
        if (isAllow==true){
        $(this).toggleClass('done-check');
        }
    })
    

    //刪除被點選者
    $('.todolist').on("click",".delete",function(){
        var index = $(this).data('num')

        $('li[data-num='+index+']').remove();

        todolist.splice(index,1)

        checkEmpty(todolist);
        checkRemoveAllBtn();
        taskEmpty();
    })

    //被選者全部刪除
    $('.remove').on("click",".delete-all",function(){
        type = $('.chosen').text();

        if (type == "all"){
            todolist = [];
        }
        else {
            tagtodolist = [] ;
            todolist.forEach(function(item){
                if(type == item.list_tag){
                    tagtodolist.push(item);
                }
            })

            let result = $(todolist).not(tagtodolist).toArray()
            
            todolist = [];
            result.forEach(function(item){
                todolist.push(item)
            })
        }
        $('.todolist').empty()        

        checkEmpty(todolist);
        checkRemoveAllBtn();
        taskEmpty();
    })

    //修改被點選者
    
    var isAllow = true;

    $('.todolist').on("click",".modify",function(e){
        isAllow = false;
        var index = $(this).data('num')

        if($('li[data-num='+index+'] .modify-input').is(":hidden")){
            $('li[data-num='+index+'] .task-name').hide()
            $('li[data-num='+index+'] .modify-input').show();
        }
        else{
            $('li[data-num='+index+'] .task-name').show()
            $('li[data-num='+index+'] .modify-input').hide();
        }
       
        
        $('.todolist').on('focusout','li[data-num='+index+'] .modify-input',function(){
            var temp = $('li[data-num='+index+'] .modify-input').val();
            todolist[index].task_name = temp;
            
            $('li[data-num='+index+'] .task-name').empty()
            $('li[data-num='+index+'] .task-name').append(temp)
    
            $('li[data-num='+index+'] .task-name').show()
            $('li[data-num='+index+'] .modify-input').hide();
            
            
        })
            e.stopPropagation();
            
        $(document).on('click',function(e){    
            if(!$('li[data-num='+index+'] .modify-input').is(e.target)){
                $('li[data-num='+index+'] .task-name').show()           
                $('li[data-num='+index+'] .modify-input').hide();
                isAllow=true;
            }
        })
    })
})