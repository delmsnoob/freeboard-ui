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
				<md-button class="md-simple">
						<md-icon>search</md-icon>
				</md-button>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'SearchSection',

	data() {
		return {
			searchFor: null,
			searchParams: null
		}
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