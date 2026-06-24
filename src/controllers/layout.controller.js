const WidgetLayout =
require("../models/widgetLayout.model");

const { getIO } =
require("../services/socket.service");

exports.updateLayout =
async (req, res, next) => {

try {

const {
workspaceId,
widgetId,
x,
y,
w,
h
} = req.body;

await WidgetLayout.update(
{
x,
y,
w,
h
},
{
where:{
WidgetId: widgetId
}
}
);

getIO()
.to(`workspace-${workspaceId}`)
.emit(
"layout:updated",
req.body
);

res.json({
success:true
});

}
catch(err){
next(err);
}

};