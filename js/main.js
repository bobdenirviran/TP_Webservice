const app = require("./class/App");
$=require("jquery");

app.loadCategsFromDb();

app.$form.submit( function( event )
{
    event.preventDefault();  // empeche le rechargement de la page au submit
    if(app.editedEvent) // teste si on est en mode édition
    {
        app.updateEvent()
    }
    else 
    {
        app.addEvent(); // test si l'ajout de note c'est bien passé
    }       
});
//on lie le click sur le parent et au moment du click Jquery vérifie que l'on a cliqué un élément du dom remove ou edit 
app.$event_container.on("click", ".remove, .edit", function()
{
    const $this =$(this);
    const $parent = $this.parent(); // évite de faire des appels à la fonction $ qui appelle le dom en totalité
    const $events = app.$event_container.find(".event"); // va chercher les enfants .event plus rapidement
    const position = $events.index( $parent ); // recherche la position dans le tableau des events
    if($this.hasClass("remove"))
    {
        app.removeEventAtIndex(position);
        app.resetForm();
    } else {
        app.editEventAtIndex(position); 
    }
});
$(window).on("beforeunload", function() {
    app.register();
});
