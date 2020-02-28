
function customTransform (config){

    Object.keys(config).forEach(key=>{

        //only tranform the numeric properties
        if (config[key]['scale'] !== 'sizes') return;

        // add transform to each styling property
        const existingTransfrom = config[key].transform;
        config[key].transform = (value, scale)=>{
            console.log('im transforming')
            console.log('value',value)
            console.log('themeDefault', scale)
            console.log('new value', scale * value)

            return scale * value;
        }
    })
    console.log('config with transform: ', config)

    return config;
}

module.exports ={customTransform}

