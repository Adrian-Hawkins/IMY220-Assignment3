let SD;
let ED;
let m;
let eventStrings = new Array();
function EventHandler(arr){
    this.event = arr;
    this.getEventsBetweenDates = function(start,end){
        SD = new Date(start.replace("/","-"));
        ED = new Date(end.replace("/","-"));
        return this.event.filter(sortBetween);
    } ;
    this.getByMonth = function(month){
        m = parseInt(month);
        return this.event.filter(sortMonth);
    }
    this.getUniqueDateAndSort = function(){
        let tmp = this.event.sort((a,b) => {
            let sa = new Date(a.dateStart);
            let sb = new Date(b.dateStart);
            if(sa < sb)
                return -1;
            if(sa > sb)
                return 1;
            return 0;
        });
        return tmp.reduce((acc, current) => {
            const t = acc.find(item => item.dateStart === current.dateStart && item.dateEnd === current.dateEnd);
            if(!t)
                return acc.concat([current]);
            else
                return acc;
        }, []);
    }
    this.getSummary = function(arr){
        if(arr == null || !Array.isArray(arr))
            this.event.filter(sortStrings);
        else
            arr.filter(sortStrings);
        let tmp = eventStrings;
        eventStrings = new Array();
        return tmp;
    }
}

Array.prototype.getSummary = function(){
    this.filter(sortStrings);
    let tmp = eventStrings;
    eventStrings = new Array();
    return tmp;
}
Array.prototype.getUniqueDateAndSort = function(){
    let tmp = this.sort((a,b) => {
        let sa = new Date(a.dateStart);
        let sb = new Date(b.dateStart);
        if(sa < sb)
            return -1;
        if(sa > sb)
            return 1;
        return 0;
    });
    return tmp.reduce((acc, current) => {
        const t = acc.find(item => item.dateStart === current.dateStart && item.dateEnd === current.dateEnd);
        if(!t)
            return acc.concat([current]);
        else
            return acc;
    }, []);
}
Array.prototype.getByMonth = function(month){
    m = parseInt(month);
    return this.event.filter(sortMonth);
}
Array.prototype.getEventsBetweenDates = function(start,end){
    SD = new Date(start.replace("/","-"));
    ED = new Date(end.replace("/","-"));
    return this.event.filter(sortBetween);
}

function sortBetween(value, index, array){
    let SD2 = new Date(value.dateStart);
    let ED2 = new Date(value.dateEnd);
    if(SD2 >= SD && ED2 <= ED)
        return value;
}
function sortMonth(value, index, array){
    const [year,mon,day] = value.dateStart.split('/');
    if(parseInt(mon) === m)
        return value;
}
function sortStrings(value, index, array){
    if(value.dateStart === value.dateEnd)
        eventStrings.push("From " + value.dateStart + ": " + value.name + "(" + value.description + ")");
    else
        eventStrings.push("From " + value.dateStart + " to " + value.dateEnd +": " + value.name + "(" + value.description + ")");
}
export {EventHandler};