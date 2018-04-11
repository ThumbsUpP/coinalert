    //console.log(asyncCall())
    /*
   asyncPricerequest(this.state.cryptoList).then(
       promises => {
           //console.log(promises)
           promises.map(promise => {
               //console.log(promise);
               coinsDataToFetch[promise[0]] = {
                   price: null,
                   historicData: null,
               }


               //coinsDataToFetch[promise[0]].price = await promise[1].data.USD
               //}).catch(err => console.log(`error fetching price data for ${promise[0]}`, err));
               console.log(coinsDataToFetch[promise[0]]);
               
           })

           promises.map(promise => {
               const promisesArray = [...promise];
               const target = promisesArray[0];
               coinsDataToFetch[target] = {
                   price: null,
                   historicData: null,
               }
               promisesArray[1].then(response => {
                   coinsDataToFetch[target].price = response.data.USD
               }).catch(err => console.log(`error fetching price data for ${target}`, err));
               promisesArray[2].then(response => {
                   coinsDataToFetch[target].historicData = response.data.Data;
               }).catch(err => console.log(`error fetching historic data for ${target}`));
               return coinsDataToFetch
           });
           return coinsDataToFetch
        })
       .catch(err => console.log('error fetching global', err))
   //setTimeout(() => { this.setState({ currentPrice: this.state.coinsData[this.state.currentCoin].price }) }, 200)
*/

    /* asyncDataHandler = () => {
        let coinsData = {};
        const getCoinPrice = (el) => {
            return axios.get(`/price?fsym=${el}&tsyms=USD`)
        }
        const getCoinHistory = (el) => {
            return axios.get(`/histohour?fsym=${el}&tsym=USD&limit=11`)
        }

        const asyncPricerequest = (li) => {
            return Promise.all(li.map(el => {
                return [el, getCoinPrice(el), getCoinHistory(el)]
            }
            ))
        }
        asyncPricerequest(this.state.cryptoList).then(
            promises => {
                promises.map(promise => {
                    const promisesArray = [...promise];
                    const target = promisesArray[0];
                    coinsData[target] = {
                        price: null,
                        historicData: null,
                    }
                    promisesArray[1].then(response => {
                        coinsData[target].price = response.data.USD
                    }).catch(err => console.log(`error fetching price data for ${target}`, err));
                    promisesArray[2].then(response => {
                        coinsData[target].historicData = response.data.Data;
                    }).catch(err => console.log(`error fetching historic data for ${target}`));
                    return coinsData
                });
                return coinsData
            })
            .then(coinsData => {this.setState({ coinsData })})
            .catch(err => console.log('error fetching global', err))
        //setTimeout(() => { this.setState({ currentPrice: this.state.coinsData[this.state.currentCoin].price }) }, 200)
    } */


    //chart
    /* let dataToConvert = null;

    while (!data[coin].price) {
        setTimeout(() => { console.log('data is not ready');
        }, 100)
    }
*/
    /* if (!data[coin].price) {
        dataToConvert = [
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }, 
            { close: 10, open: 9 }
            ];

        setTimeout(() => { this.setState({ isLoaded: true }) }, 100)
    } else { */