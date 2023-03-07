// describe('PUT /blogs/:id', () => {
//     const baseBlog = {
//         name: "Blog updated",
//         description: "Lorem ipsum dolor sit amet",
//         websiteUrl: "https://it-incubator.io/",
//     };
//
//     let createdBlog;
//
//     beforeEach(async () => {
//         createdBlog = await createTestBlog();
//     });
//
//     afterEach(async () => {
//         await deleteTestBlog(createdBlog.id);
//     });
//
//     const updateBlog = async (id, update) => {
//         return request(app)
//             .put(`/blogs/${id}`)
//             .send(update)
//             .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     };
//
//     const assertBlogUpdated = async (id, expectedUpdate) => {
//         const updatedBlog = await request(app)
//             .get(`/blogs/${id}`)
//             .send();
//
//         expect(updatedBlog.body).toMatchObject(expectedUpdate);
//     };
//
//     it(`should update blog and return 204`, async () => {
//         const update = { ...baseBlog };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(204);
//         await assertBlogUpdated(createdBlog.id, update);
//     });
//
//     it(`should NOT update blog because BAD ID and return 404`, async () => {
//         const response = await updateBlog('bad-id', baseBlog);
//         expect(response.status).toBe(404);
//     });
//
//     it(`should NOT update blog without name and return 400`, async () => {
//         const update = { ...baseBlog, name: null };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
//
//     it(`should NOT update blog w. long name and return 400`, async () => {
//         const update = {
//             ...baseBlog,
//             name: 'x'.repeat(100),
//         };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
//
//     it(`should NOT update blog w. not string name and return 400`, async () => {
//         const update = { ...baseBlog, name: 123 };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
//
//     it(`should NOT update blog without Description and return 400`, async () => {
//         const update = { ...baseBlog, description: null };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
//
//     it(`should NOT update blog w. long description and return 400`, async () => {
//         const update = {
//             ...baseBlog,
//             description: 'x'.repeat(1000),
//         };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
//
//     it(`should NOT update blog w. not string Description and return 400`, async () => {
//         const update = { ...baseBlog, description: 123 };
//         const response = await updateBlog(createdBlog.id, update);
//         expect(response.status).toBe(400);
//     });
// });
