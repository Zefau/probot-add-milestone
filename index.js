
module.exports = ({ app }) => {
	app.log.info('Yay, the app was loaded!');
  
	app.on([ 'issues.labeled' ], async (context) => {
		const { payload, octokit } = context;
    const config = await context.config('./addMilestoneToIssueConfig.yml', { milestoneId: 1, label: 'enhancement' });
    app.log.info(config);
    
		//
		if (payload.label.name.toLowerCase() === config.label.toLowerCase() && !payload.issue.milestone) {
			
			// assign milestone
			octokit.issues.update(context.issue({
        'milestone': config.milestoneId
			}));
			
			const issueComment = context.issue({
				body: "**Stimme für deinen Feature Request ab!**\n\nStimme für deinen Feature Requests ab indem du die Emoticons als Reaktion nutzt:\n![Github Reactions](https://forum.iobroker.net/assets/uploads/files/1606215967286-1c3e566f-8d54-4f19-8948-eb8833c5b15f-image.png)\nSiehe auch https://forum.iobroker.net/topic/30668/jarvis-v2-0-0-just-another-remarkable-vis/1986\n\n_____\n\n**Vote up your Feature Request!**\n\nVote up your feature request by selecting an emoticon as reaction:\n![Github Reactions](https://forum.iobroker.net/assets/uploads/files/1606215967286-1c3e566f-8d54-4f19-8948-eb8833c5b15f-image.png)",
			});
			
			return octokit.issues.createComment(issueComment);
		}
	});
}
