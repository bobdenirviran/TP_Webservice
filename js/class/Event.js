const $ = require("jquery");

class Event {
    constructor( name, date, place, latitude, longitude, id_categ, category_label ){
        this.$dom = null;

        this.$name = null;
        this.$date = date;
        this.$place = null;
        this.$latitude = null;
        this.$longitude = null;

        this.id = 0;
        this.name = name;
        this.date = date;
        this.place = place;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id_categ = id_categ;
        this.category_label = category_label;

    }
    render( $parent ){

        let html = "<div class='event'>";
            html += "<div class='edit'>📝</div>";
            html += "<div class='remove'>X</div>";
        html += "</div>";

        this.$name = $("<h4>" + this.name + "</h4>");
        this.$date = $("<i>Programmé le " + this.date.toLocaleString("fr") + "</i>");
        this.$place = $("<p>Situé " + this.place + "</p>");
        this.$latitude = $("<p>Latitude " + this.latitude + "</p>");
        this.$longitude = $("<p>Longitude " + this.longitude + "</p>");
        this.$categ = $("<p>" + this.category_label + "</p>");

        //Créer un élément (dom) dynamiquement
        this.$dom = $( html );
        this.$dom.append( this.$name );
        this.$dom.append( this.$date );
        this.$dom.append( this.$place );
        this.$dom.append( this.$latitude);
        this.$dom.append( this.$longitude);
        this.$dom.append( this.$categ);

        //On ajoute l'élement dans le dom parent
        $parent.append( this.$dom );
    }

    remove(){
        this.$dom.remove();
    }

    update(){

        this.$name.html( this.name );
        this.$date.html( "Déplacé le " + this.date.toLocaleString("fr") );
        this.$place.html( "Situé " + this.place );
        this.$latitude.html( "Latitude " + this.latitude );
        this.$longitude.html( "Longitude " + this.longitude );
        this.$categ.html( this.category_label );
    }
    toJSON(){
        return{
            name: this.name,
            date: this.date,
            place: this.place,
            latitude: this.latitude,
            longitude: this.longitude,
            id_categ: this.id_categ
        }
    }
}
module.exports = Event;