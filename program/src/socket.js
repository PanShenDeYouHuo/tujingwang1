import io from 'socket.io-client';

function socketClass () {
	
	// https
	// let url = 'https://192.168.0.105:3000/';

	// http
	let url = 'http://192.168.0.105:3000/';
	this.opt = {
		autoConnect: false,
		query: {},
		transports: ['websocket'],
	};

	this.socket = io.connect(url, this.opt);

	this.socket.on('disconnect', ()=> {
		console.log("网络中断");
	});

	this.socket.on('reconnect', ()=> {
		console.log("重新链接成功");
	});

	this.socket.on("connecting", ()=> {
		console.log("正在重连...");
	});

	this.socket.on("connect", ()=> {
		console.log("连接成功");
	});

	this.socket.on('connect_error', (error) => {
		console.log(`connect_${error}`);
	});

	/**
	 * 登入接口
	 * @param  {[string]} account  [登入账号]
	 * @param  {[string]} password [登入密码]
	 * @return {[type]}          [description]
	 */
	this.connect = (account, password)=> {

		this.opt.query = {
			account,
			password
		};
		this.socket.disconnect();
		setTimeout(()=> {
			this.socket.open();
		}, 100);

	}


	/**
	 * 发送接口
	 * @param  {[String]} emitName [发送接口名]
	 * @param  {[Object]} data     [发送的数据]
	 * @return {[Object]}          [成功的数据]
	 */
	this.myEmit = (emitName, data)=> {

		return new Promise((resolve, reject)=> {
			this.socket.on('disconnect', ()=> {
				reject({message:"网络中断"});
				this.socket.removeAllListeners("disconnect");
			});
			this.socket.emit(emitName, data, (res)=> {
				if(res.err === -1){
					reject({message:data.message});
					this.socket.removeAllListeners("disconnect");
				}
				else{
					resolve(res);
					this.socket.removeAllListeners("disconnect");
				}
			});
		});
	}

}

export default new socketClass();