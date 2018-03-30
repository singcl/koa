/**
 * 最终的一个引用关系：
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.request.req = req;
    ctx.response.res = res;
    ctx.req = req;
    ctx.res = res;
 */
const context = {
    get query() {
        return this.request.query
    },

    get body() {
        return this.response.body
    },

    set body(data) {
        this.response.body = data
    },

    get status() {
        return this.response.status
    },

    set status(statusCode) {
        this.response.status = statusCode
    }
}

module.exports = context
