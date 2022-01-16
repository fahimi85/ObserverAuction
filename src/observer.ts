interface Auction {
    bidder(user: Observer): void;
    unbidder(user: Observer): void;
    newHighbid(): void;

}
interface Observer {
    mybid(): number;
    notifyMe(): void;

}

class User implements Observer {
    mybid() {
        let bid: number = Math.floor(Math.random() * 25) + 50
        console.log('Bidder : I send new high bid Antique.', bid)
        return bid
    }

    notifyMe(): void {
        console.log('Bidder : I receive new high bid.')
    }

}
class Antique implements Auction {
    bidders: Observer[] = []
    bidder(user: Observer): void {
        if (this.bidders.indexOf(user) == -1) {
            this.bidders.push(user);
            console.log(`Auctioneer : You are successfuly bidder to Antique`);
        } else {
            console.log(`Auctioneer : You already  bidder !`)
        }
    }
    unbidder(user: Observer): void {
        const index = this.bidders.indexOf(user)
        if (index >= 0) {
            this.bidders.splice(index, 1)
        }
    }
    newHighbid(): void {
        var maxbid = 0
        this.bidders.forEach(item => {
            // item.mybid()
            let c = item.mybid()

            if (c > maxbid) { (maxbid = c) }
        })
        console.log(`Auctioneer :new high bid`, maxbid)
        this.bidders.forEach(item => {
            item.notifyMe()
        })
    }


}
export function observer() {
    let m = new Antique();

    let o1 = new User();
    let o2 = new User();
    let o3 = new User();

    m.bidder(o1)
    m.bidder(o2)
    m.bidder(o3)

    m.newHighbid()

}