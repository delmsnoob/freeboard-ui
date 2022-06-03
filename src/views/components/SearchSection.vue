<template>
	<div class="wrapper">
		<div class="md-layout mr-auto ml-auto md-gutter">
			<div class="md-layout-item md-size-30">
				<md-field>
					<label for="country">Search by</label>
					<md-select v-model="searchParams" name="saerch" id="search" md-dense>
						<md-option value="post">Post</md-option>
						<md-option value="user">User</md-option>
						<md-option value="comment">Comment</md-option>
					</md-select>
				</md-field>
			</div>

			<div class="md-layout-item md-size-60">
				<md-field>
					<md-input
						v-model="searchFor"
						md-layout="box"
						md-dense
					>
						<label>Posts</label>
					</md-input>
				</md-field>
			</div>

			<div class="md-layout-item md-size-10 search-button">
				<md-button class="md-simple" @click="handleSearch">
					<md-icon>search</md-icon>
				</md-button>
			</div>
			{{ postContent }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'SearchSection',

	data() {
		return {
			searchFor: null,
			searchParams: null,
			postContent: [],
			hidePosts: this.initialDisplaySearch
		}
	},

	props: {
		posts: { 
			type: [Array, Object]
		},
		showPosts: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		handleSearch() {
			const params = {
				searchBy: this.searchParams,
				searchData: this.searchFor
			}

			if (params.searchBy === 'post')  {
				const tempData = this.posts
				
				const response = tempData.filter(keyword => keyword.author_post.includes(params.searchData))
				const parseResponse = JSON.parse(JSON.stringify((response)))
				this.postContent = parseResponse

			} else if (params.searchBy === 'user') {
				const tempData = this.posts
				
				const response = tempData.filter(keyword => keyword.author_name.includes(params.searchData))
				const parseResponse = JSON.parse(JSON.stringify((response)))
				this.postContent = parseResponse

			} /* else if (params.searchBy === 'comment') {
				const tempData = this.posts
				
				const response = tempData.filter(keyword => keyword.username.includes(params.searchData))
				const parseResponse = JSON.parse(JSON.stringify((response)))
				this.postContent = parseResponse
			} */
		},
	}
}
</script>

<style lang="scss" scoped>
	.wrapper {
		margin-bottom: 2rem;
	}
	.search-button {
		margin-top: .5rem !important;
		padding: 0 !important;
	}
</style>