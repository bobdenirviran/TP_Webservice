const $ = require("jquery");
class Service 
{
    getAllCategs(callback)
    {
        $.ajax(
        {
            url: API_BASE_URL + "categs",
            dataType: "json",
            method: "GET",     
            success: callback, // la fonction getAllEvents est asynchrone
            error: function (error){
                console.log(error);
            }
        });
    }

    getAllEvents(callback)
    {
        $.ajax(
        {
            url: API_BASE_URL + "events",
            dataType: "json",
            method: "GET",     
            success: callback, // la fonction getAllEvents est asynchrone
            error: function (error){
                console.log(error);
            }
        });
    }

    createEvent( data, callback )
    {
        $.ajax(
        {
            url: API_BASE_URL + "events/create",
            method: "POST",
            data : data,
            dataType:"json",
            success: callback,
            error: function(error)
            {
                console.log( error );
            }
        });
    }

    updateEvent( data, id, callback )
    {
        $.ajax({
            url: API_BASE_URL + "events/update/" + id,
            method: "PUT",
            contentType: "application/json",
            data : JSON.stringify(data),
            dataType:"json",
            success: callback,
            error: function(error)
            {
                console.log( error );
            }
        })
    }

    removeEvent( id, callback )
    {
        $.ajax({
            url: API_BASE_URL + "events/delete/" + id,
            method: "DELETE",
            success: callback,
            error: function(error)
            {
                console.log( error );
            }
        })
    }
}
module.exports = Service;