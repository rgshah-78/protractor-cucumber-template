const fs = require('fs');
const mv = require('mv');
const path = require('path');
const fsCompareSync = require('fs-compare').sync;

let ConsolidatedReport = function () {

    let dirPath = './json_reports';  //directory path
    let filesName=[]; // All file name storage in array from directory path
    let URI=[]; // URI extracted from file storage from directory path
    let countFiles = 0;

    function getFileNameListFromDirPath () {
        return new Promise((resolve,reject) => {
			return fs.readdir(dirPath, function(err,list){
				if(!err){
					resolve (list);
				}
				else {
					reject (false);
				}
			});
        });
    }

    function inArray(arr,value) {
        // Returns true if the passed value is found in the //list array. Returns false if it is not.
        for (let i=0; i < arr.length; i++) {
            if (arr[i] == value) {
                return true;
            }
        }
        return false;
    }


    function filesConsolidation () {
        try{

            getFileNameListFromDirPath ().then((list)=>{
                let fileType = '.json'; //file extension

                let filesLength = list.length;
                console.log('Number of files in folder '+filesLength);

                for(let i=0; i<filesLength; i++) {
                    if(path.extname(list[i])===fileType) {

                        let fileName = list[i];

                        // filesName is array of file present in directory path
                        if( !(inArray(filesName,fileName))){
                            filesName.push(fileName); //store the file name into the array filesName
                            console.log('fileName >'+fileName); //print the file
                        }

                    }
                    else {
                        console.log("File name other then *.json");
                    }
                }

                countFiles = filesName.length;
                console.log("count Files which is stored in fileNames array  >"+ countFiles);

                getURIFromFileName();
            });
        }
        catch(e){
            console.log("Error while consolidation of files >"+e);
        }
    }

    function getFileSizeInBytes(filename) {
        let stats = fs.statSync(filename);
        let fileSizeInBytes = stats.size;

        return fileSizeInBytes;
    }

    function getURIFromFileName () {
        try{

            let filesLength = filesName.length;
            console.log("count Files For getting URI  >"+filesLength);

            for (let i = 0; i < filesLength; i++) {
                let fileSizeInBytes = getFileSizeInBytes('./json_reports/'+filesName[i]);
                //console.log('fileSizeInBytes >'+ fileSizeInBytes);

                if(fileSizeInBytes > 0) {

                    let file = fs.readFileSync('./json_reports/'+filesName[i]);
                    let jsonFile = JSON.parse(file.toString());
                    if(jsonFile.length===0){
                        console.log('uri > Blank json');// Blank json file
                        URI.push('blank');
                    }
                    else {
                        console.log('uri >'+jsonFile[0].uri);// URI of above json file
                        URI.push(jsonFile[0].uri);
                    }
                }
                else {
                    console.log('uri > file is not ready to use');
                    URI.push('file is not ready to use');
                }
            }

            moveRetriedOldFeatureFiles();
        }
        catch(e){
            console.log("Error in getURIFromFileName >"+e);
        }
    }

    function modifiedTime(fileName, cb) {
      return fs.statSync(fileName).mtime;
    };

    function moveRetriedOldFeatureFiles () {
        try {
            let i, j;
            let sizeOfURI = URI.length;
            //console.log("retried URI feature files >"+sizeOfURI);

            for (i = 0; i < sizeOfURI; i++) {
                for (j = i + 1; j < sizeOfURI; j++) {
                    if (URI[i] == URI[j]) {
                        console.log("Repeated URI :"+URI[j]);

                        if (!fs.existsSync('retry_failed_files')) {
                            fs.mkdirSync('retry_failed_files');
                        }

                        // diff is -1 if filesName[i] was created before filesName[j]
                        // diff is 0 if filesName[i] was created at the same time as filesName[j]
                        // diff is 1 if filesName[i] was created after filesName[j]
                        let diff = fsCompareSync(modifiedTime, './json_reports/'+filesName[i],  './json_reports/'+filesName[j]);

                        if(diff===1){ //diff is 1
                            // mv('source/file', 'dest/file', function(err) { });
                            mv('./json_reports/'+filesName[j], './retry_failed_files/'+filesName[j], function(err) {
                              // done. it tried fs.rename first, and then falls back to
                              // piping the source file to the dest file and then unlinking
                              // the source file.
                            });
                        }
                        else { // diff is -1 or 0
                            mv('./json_reports/'+filesName[i], './retry_failed_files/'+filesName[i], function(err) {
                              // done. it tried fs.rename first, and then falls back to
                              // piping the source file to the dest file and then unlinking
                              // the source file.
                            });
                        }

                    }
                }
            }
        }
        catch(e){
            console.log("Error in moveRetriedOldFeatureFiles >"+e);
        }
    }

    function consolidatedReportFiles() {
        filesConsolidation();
    }

    this.consolidatedReportFiles = consolidatedReportFiles;
};

let reportInstance = new ConsolidatedReport();
module.exports = reportInstance;