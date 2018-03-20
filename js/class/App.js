const $=require("jquery"),
Event = require("./Event"),
Service = require("./Service")
API_BASE_URL = "http://localhost/APIS/TP_API/";

class App{
    constructor(){
        this.$form = $("#add-event");
        this.$event = $("#event");
        this.$name = $("#name");
        this.$date = $("#date");
        this.$place = $("#place");
        this.$latitude = $("#latitude");
        this.$longitude = $("#longitude");
        this.$id_categ = document.getElementById("id_categ");
        this.$event_container = $("#events");
        this.$submit= this.$form.find("input[type='submit']");

        this.editedEvent=false;

        this.events = []        
        this.categs = [];

        this.service = new Service();
    }

    resetForm()
    {
        this.$name.val("");
        this.$date.val("");
        this.$place.val("");
        this.$latitude.val("");
        this.$longitude.val("");
        this.$id_categ.value = "";
        this.$submit.val("Ajouter");
        this.editedEvent = false;
    }

    addEvent()
    {
        const name = this.$name.val();
        const date = this.$date.val();
        const place = this.$place.val();
        const latitude = this.$latitude.val();
        const longitude = this.$longitude.val();
        const id_categ = this.categs.id;
        if( !name || !place) return false;
        const create_data = {
            name: name,
            date: date,
            place: place,
            latitude: latitude,
            longitude: longitude,
            id_categ: id_categ
        };
        this.service.createEvent(
            create_data,
            (response) => 
            {
                if( response.success ) 
                {
                    let category = this.getCategById( id_categ )
                    const event = new Event( name, new Date(), place, latitude, longitude, id_categ, category.label);
                    event.id = response.id;
                    this.events.push( event );
                    event.render( this.$event_container);
                } else 
                {
                    console.log( "L'evènement ne peut pas etre créé !")
                }
            });
    }

    removeEventAtIndex(position)
    {
        const event = this.events[position]; //chargement de la note concernée
        this.service.removeEvent(
            event.id,
            ( response ) => {
                if(response.success){
                    event.remove(); // Retirer la note du Dom
                    this.events.splice(position,1); // suppression du tableau des notes de la clef et de l'élément
                }
            } 
        ); 
    }

    editEventAtIndex(position)
    {
        this.editedEvent = this.events[position]; //chargement de la note concernée
        this.$submit.val("Editer");
        this.$name.val(this.editedEvent.name);
        
        let date = new Date(this.editedEvent.date);
        let month = date.getMonth() + 1;
        month = (month < 10) ? "0" + month : month;
        let date_str = date.getFullYear() + "-" + month + "-" + date.getDate();

        this.$date.val(date_str);
        this.$place.val(this.editedEvent.place);
        this.$latitude.val(this.editedEvent.latitude);
        this.$longitude.val(this.editedEvent.longitude);
        this.$id_categ.value = this.editedEvent.id_categ;
    }

    updateEvent()
    {
        const name = this.$name.val();
        const date = this.$date.val();
        const place = this.$place.val();
        const latitude = this.$latitude.val();
        const longitude = this.$longitude.val();
        const id_categ = this.$id_categ.value;
        if( !name || !place) return false;
        const update_data = {
            name: name,
            date: date,
            place: place,
            latitude: latitude,
            longitude: longitude,
            id_categ: id_categ
        }
        this.service.updateEvent(
            update_data,
            this.editedEvent.id,
            (datas) => {
                if(datas.success) {
                    this.editedEvent.name = name;
                    this.editedEvent.date = date;
                    this.editedEvent.place = place;
                    this.editedEvent.latitude = latitude;
                    this.editedEvent.longitude = longitude;
                    this.editedEvent.id_categ = id_categ;
                    this.editedEvent.update();
                    this.resetForm();
                } else
                { 
                    console.log("La note n'a pas été modifiée !");
                }
            }
        )
        return true;
    }

    register()
    {
        let save_events = JSON.stringify(this.events);
        localStorage.setItem(STORAGE_KEY, save_events);
    }

    generateCategs( json_categs )
    {
        
        for(let json_categ of json_categs)
        {
            let option = document.createElement('option');
            let value = json_categ.id;
            let categ = json_categ.label
            this.categs.push( json_categ );
            option.innerText = categ;
            option.value = value;
            this.$id_categ.appendChild(option);
        }
    }

    getCategById( id_categ )
    {
        for(let category of this.categs)
        {
            if( category.id == id_categ)
            return category;
        }
    }

    generateEvents( json_events )
    {
        for(let json_event of json_events) 
        {
            let category = this.getCategById( json_event.id_categ )
            const date = new Date( json_event.date );
            const event = new Event( json_event.name, date, json_event.place, json_event.latitude, json_event.longitude, json_event.id_categ, category.label)
            event.id = json_event.id;
            this.events.push( event );
            event.render( this.$event_container);
        }
    }

    loadCategsFromDb()
    {
        this.service.getAllCategs((data) => {
            if(data.success ) {
                this.generateCategs( data.categs );
                this.loadEventsFromDb();
            } else {
                this.Categs = [];
            }
        });
    }

    loadEventsFromDb()
    {
        this.service.getAllEvents((data) => {
            if(data.success ) {
                this.generateEvents( data.events );
            } else {
                this.Events = [];
            }
        });
    }
}
module.exports = new App(); // correspond un peu au design pattern du singleton