const form = document.getElementById('vote-form');
// submit event form
form.addEventListener('submit', (e)=> {
    const choice = document.querySelector('input[name=activity]:checked').value;
    const data = {activity: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    e.preventDefault();
});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    // count votes
    const voteCounts = votes.reduce((acc, vote) => (acc[vote.activity] =
        ((acc[vote.activity] || 1) + parseInt(vote.points)), acc), {});
    console.log("vote counts===" + voteCounts);
        let dataPoints = [
            { label: 'Casino', y: voteCounts.Casino},
            { label: 'Shooting', y: voteCounts.Shooting},
            { label: 'Walk', y: voteCounts.Walk},
            { label: 'Go_Cart', y: voteCounts.Go_Cart},
            { label: 'ArcheryTag', y: voteCounts.ArcheryTag},
            { label: 'LazerTag', y: voteCounts.LazerTag},
            { label: 'EscapeRoom', y: voteCounts.EscapeRoom}
/*             { label: 'Casino', y: 0},
            { label: 'Shooting', y: 0},
            { label: 'Walk', y: 0},
            { label: 'Go_Cart', y: 0},
            { label: 'ArcheryTag', y: 0},
            { label: 'LazerTag', y: 0},
            { label: 'EscapeRoom', y: 0}, */
        ];
        
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                   // text: `Voting Results ${totalVotes}`
                   text: "Voting Results"
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
                // Enable pusher logging - don't include this in production
                Pusher.logToConsole = true;
        
                var pusher = new Pusher('e8a0376ff1f5e80b5770', {
                  cluster: 'us2',
                  forceTLS: true
                });
            
                var channel = pusher.subscribe('activity-poll');
                channel.bind('activity-vote', function(data) {
                    dataPoints = dataPoints.map(x => {
                        if(x.label == data.activity){
                            x.y += data.points;
                            return x;
                        }
                        else{
                            return x;
                        }
                    });
                    chart.render();
                });
        }
});

