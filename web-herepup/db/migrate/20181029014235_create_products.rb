class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title
      t.string :vendor
      t.text :body_html
      t.string :tags, array: true
      t.boolean :active, default: true
      t.jsonb :options, array: true, default: []
      t.jsonb :variants, array: true, default: []

      t.timestamps
    end
  end
end
