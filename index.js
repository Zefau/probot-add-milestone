
module.exports = ({ app }) => {
	app.log.info('Yay, the app was loaded!');

	app.on('issues.opened', async (context) => {
		const { payload, octokit } = context;
		const config = await context.config('config.yml', { milestoneId: 9 });
		app.log.info(config);
		
		/*
		* Fetch the issue again to double-check that it has no labels.
		* Sometimes, when an issue is opened with labels, the initial
		* webhook event contains no labels.
		* https://github.com/eslint/eslint-github-bot/issues/38
		*/
		let issue = null;
		if (!payload.issue || payload.issue.labels.length === 0) {
			issue = await octokit.issues.get(context.issue()).then((res) => res.data);
			
			if (!issue || issue.labels.length === 0) {
				return false;
			}
		}
		else {
			issue = payload.issue;
		}
		
		//
		const labels = payload.issue.labels.map(label => label.name);
		if (labels.indexOf('feature') > -1) {
			
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