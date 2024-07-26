const parseDomainCommon = {
	getPrimaryDomainFromUrlStr(url) {
		let urlParts = /^(:?\/\/|https?:\/\/)?([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/; // 1 = protocol, 2 = auth, 3 = hostname, 4 = port, 5 = path
		let urlSplit = url.match(urlParts);
		if (urlSplit === null) {
			return null;
		}
		let hostname = urlSplit[3]; // domain will now be something like sub.domain.example.com
		return parseDomainCommon.getPrimaryDomain(hostname);
	},
	getPrimaryDomain(domain) {
		let host = (domain || location.hostname).split('.');
		host = host.splice(host.length - 2);
		host = host.join('.');
		return host;
	},

}
module.exports=parseDomainCommon