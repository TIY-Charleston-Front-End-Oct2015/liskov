var templates = {
  sideBarUser: [
    "<li><img src='<%= avatar %>' /><h5><%= username %></h5></li>"
  ].join(""),
  message: [
    "<li id='<%= messageid %>'><img src='<%= avatar %>' /><h3><%= username %></h3>",
    "<p><%= content %></p>",
    "<button class='delete' type='button'>X</button></li>"
  ].join("")
};
