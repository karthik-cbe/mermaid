
import * as Logger from '../../logger';
var log = new Logger.Log();

var relations = [];

let classes;
var idCache;
if(typeof Map !== 'undefined'){
    classes = new Map();
}
// Functions to be run after graph rendering
var funs = [];
/**
 * Function called by parser when a node definition has been found
 * @param id
 * @param text
 * @param type
 * @param style
 */
exports.addClass = function (id) {
    if(typeof classes.get(id) === 'undefined'){
        classes.set(id, {
            id:id,
            methods:[],
            members:[]
        });
    }
};

exports.clear = function () {
    relations = [];
    classes.clear();
};

module.exports.getClass = function (id) {
    return classes.get(id);
};
module.exports.getClasses = function (id) {
    return classes;
};

module.exports.getRelations = function () {
    return relations;
};

exports.addRelation = function (relation) {
    log.warn('Adding relation: ' + JSON.stringify(relation));
    exports.addClass(relation.id1);
    exports.addClass(relation.id2);

    relations.push(relation);
};

exports.addMembers = function (className, MembersArr) {
    var theClass = classes.get(className);
    if(typeof MembersArr === 'string'){
        if(MembersArr.substr(-1) === ')'){
            theClass.methods.push(MembersArr);
        }
        else{
            theClass.members.push(MembersArr);
        }
    }
    //console.warn('MembersArr:'+MembersArr);
};

exports.cleanupLabel = function (label) {

    if(label.substring(0,1) === ':'){
        //console.warn('Fixing label:'+label.substr(2).trim());
        return label.substr(2).trim();
    }
    else{
        return label.trim();
    }
};

exports.lineType = {
    LINE:0,
    DOTTED_LINE:1
};

exports.relationType = {
    AGGREGATION:0,
    EXTENSION:1,
    COMPOSITION:2,
    DEPENDENCY:3
};
