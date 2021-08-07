<template>
  <div class="autocomplete">
    <div class="control">
      <!--for auto fetch-->
      <input
        type="text"
        class="input-dropdown"
        @blur="isOpened = false"
        @focus="isOpened = true"
        @keyup="autoUp()"
        v-model="searchText"
        placeholder="Search by city"
        ref="dropdown"
      />
      <!-- -->

      <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
    </div>

    <transition name="fade" mode="in-out">
      <!--Auto Fetch-->
      <ul class="options-list" ref="optionsList" v-if="isOpened">
        <li v-if="searchText.length < 3">
          Type minimum 3 letters to get options
        </li>
        <li
          ref="optionsListItem"
          v-for="(option, i) in apiResponseOptions"
          :key="i"
          @mouseenter="selected = i"
          @mousedown="select()"
          :class="{ selected: i === selected }"
        >
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import weatherService from "../services/weather";

export default {
  data: () => ({
    isOpened: false,
    selected: null,
    search: "",
    apiResponseOptions: "",
    selectedOptions: [],
    isLoading: true,
    searchText: "",
  }),
  created() {
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    autoUp() {
      if (this.searchText.length >= 3) {
        this.getCities();
      }
    },
    select() {
      let selectedOption;
      selectedOption = this.apiResponseOptions[this.selected];
      this.$emit("selected-item", selectedOption);
      this.searchText = selectedOption.name;
      this.isOpened = false;
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpened = false;
      }
    },

    async getCities() {
      this.apiResponseOptions = [];
      try {
        const { data } = await weatherService.getCities(this.searchText);
        this.apiResponseOptions = data;
      } catch (error) {
        console.log(error);
        this.apiResponseOptions = [];
      }
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
}
input.input-dropdown {
  height: 36px;
  width: 100%;
  border: 1px solid #2196f3;
  border-radius: 8px;
  padding-right: 38px;
  padding-left: 40px;
  outline: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
input.input-dropdown::-webkit-input-placeholder {
  color: rgb(197, 191, 191);
  font-size: 0.9rem;
}
.count-label {
  position: absolute;
  right: 2.8rem;
  top: 0.61rem;
}
.search-icon {
  position: absolute;
  top: 0.66rem;
  left: 0.6rem;
}
.search-icon svg {
  width: 20px;
  fill: #827f7f;
}
div.control {
  position: relative;
  display: flex;
  margin-bottom: 0.1rem;
}
ul.options-list {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 0;
  border: 1px solid #dbdbdb;
  border-radius: 0 0 3px 3px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 3px 6px 0px rgba(195, 195, 195, 0.76);
  position: absolute;
  width: 100%;
  z-index: 10;
  min-height: 50px;
  background-color: #fff;
}
li:last-child {
  border-bottom: none;
}
li {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  cursor: pointer;
  transition: 0.3s all ease;
  word-wrap: break-word;
}

li:hover {
  background-color: #2196f3;
  color: #fff;
}
span {
  margin-right: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  will-change: opacity;
  transform: translateY(20%);
}
</style>
